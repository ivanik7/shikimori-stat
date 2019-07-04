import koa from "koa";
import koaRouter from "koa-router";
import pureimage from "pureimage";
import { hexToRgb, rgbToHex, gradient } from "./color";
import getHistory from "./getHistory";

const monthNames = [
  "Янв",
  "Фев",
  "Март",
  "Апр",
  "Май",
  "Июнь",
  "Июль",
  "Авг",
  "Сент",
  "Окт",
  "Нояб",
  "Дек"
];

const app = new koa();
const router = new koaRouter();
const font = pureimage.registerFont("./fonts/roboto.ttf", "roboto");

router.get("/stat", async (ctx, next) => {
  const startTime = new Date();

  const dates = {};

  const history = await getHistory(ctx.query.user);
  for (const e of history) {
    const date = new Date(e.created_at);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    if (e.description.search(/просмо/i) !== -1) {
      let count = 1;
      if (e.description.search(/эпизода|эпизодов/i) !== -1) {
        const match = e.description.match(/\d+/);
        count = match[0];
      } else if (e.description.search(/эпизоды/i) !== -1) {
        count = e.description.match(/\d+/g).length;
      }
      if (dates[date.toISOString()]) {
        dates[date.toISOString()] = dates[date.toISOString()] + count;
      } else {
        dates[date.toISOString()] = count;
      }
    }
  }

  let max = 0;
  let summ = 0;
  let length = 0;
  for (const key in dates) {
    if (dates.hasOwnProperty(key)) {
      const e = dates[key];
      if (e > max) {
        max = e;
      }
      summ = summ + e;
      length++;
    }
  }
  const mid = summ / length;
  const maxPers = mid * 2 > max ? max : mid * 2;

  const minColor = hexToRgb(ctx.query.mincolor);
  const maxColor = hexToRgb(ctx.query.maxcolor);
  const blankColor = hexToRgb(ctx.query.blankcolor);
  const textColor = hexToRgb(ctx.query.textcolor);

  const img = pureimage.make(875, 128);

  const imgc = img.getContext("2d");

  const offsetX = 20;
  const offsetY = 16;

  imgc.font = "12zpt roboto";
  imgc.fillStyle = `rgba(${textColor.red},${textColor.green},${textColor.blue}, 1)`;
  imgc.fillText("ПН", 0, 28);
  imgc.fillText("ЧТ", 0, 76);
  imgc.fillText("СБ", 0, 124);

  let lastMon = -1;
  for (let week = 51; week >= 0; week--) {
    const mount = new Date();
    mount.setDate(mount.getDate() - week * 7);
    if (mount.getMonth() !== lastMon || lastMon === -1) {
      lastMon = mount.getMonth();
      imgc.fillStyle = `rgba(${textColor.red},${textColor.green},${textColor.blue}, 1)`;
      imgc.fillText(`${monthNames[lastMon]}`, 816 - week * 16 + offsetX, 10);
    }

    for (let day = 0; day < 7; day++) {
      const date = new Date();
      date.setDate(date.getDate() - (week * 7 + (date.getDay() - day) - 1));
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      // console.log(date, week, day);
      const e = dates[date.toISOString()];
      if (e) {
        const pers = e / maxPers;
        imgc.fillStyle = rgbToHex(
          gradient(minColor, maxColor, pers > 1 ? 1 : pers)
        );
      } else {
        imgc.fillStyle = rgbToHex(blankColor);
      }
      if (date <= new Date()) {
        imgc.fillRect(816 - week * 16 + offsetX, day * 16 + offsetY, 12, 12);
      }
    }
  }
  ctx.response.status = 200;
  ctx.type = "image/png";
  await pureimage.encodePNGToStream(img, ctx.res);
  console.log(
    `user: ${ctx.query.user} history: ${
      history.length
    } dates: ${length} time: ${new Date().getTime() - startTime.getTime()}`
  );
});

app.use(async (ctx, next) => {
  for (const key of Object.keys(ctx.query)) {
    ctx.query[key.replace("amp;", "")] = ctx.query[key];
  }
  await next();
});

app.use(router.routes());

font.load(() => app.listen(8080, () => console.log("started")));

// 428722
