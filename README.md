# shikimori-stat

**[shikimori-stat.ivanik.ru](https://shikimori-stat.ivanik.ru/)**

Генератор картинок со статистикой [Shikimori](https://shikimori.one/)

## Пример

Пример статистики моего аккаунта

[![Статистика](https://shikimori-stat-api.ivanik.ru/stat.svg?user=ivanik&blankcolor=bebebe&mincolor=79a9cf&maxcolor=79a9cf&textcolor=000000)](https://shikimori.one/ivanik)

## Запрос картинки вручную

Есть сайт, где можно вставить ссылку на профиль и не надо будет думать: [shikimori-stat.ivanik.ru](https://shikimori-stat.ivanik.ru/)*.

Если вы все же решили сделать всё руками, картинку можно получить по ссылке:

```
https://shikimori-stat-api.ivanik.ru/stat.svg?user=ivanik&blankcolor=bebebe&mincolor=79a9cf&maxcolor=79a9cf&textcolor=000000
```

Параметры:

| Параметр     | Значение                                |
| ------------ | --------------------------------------- |
| `user`       | ID или ник пользователя                         |
| `blankcolor` | Цвет пустых клеток                      |
| `mincolor`   | Цвет клеток при минимальной активности  |
| `maxcolor`   | Цвет клеток при максимальной активности |
| `textcolor`  | Цвет текста                             |

Все цвета передаются в HEX формате без решетки, например `textcolor=ffffff`

Доступные форматы `.svg` и `.png`.

В поле `user` можно передать ник из ссылки профиля на шикимори или id пользователя

## Вставка на Shikimori

На Shikimori картинку можно вставить двумя способами:

Как постер. Он будет не кликабелен и автоматически принимает нужный размер.

```bbcode
[poster]
https://shikimori-stat-api.ivanik.ru/stat.svg?user=ivanik&blankcolor=bebebe&mincolor=79a9cf&maxcolor=79a9cf&textcolor=000000
[/poster]
```

Как картинку. Будет кликабельна, размер задается вручную.

```bbcode
[img 875x128]
https://shikimori-stat-api.ivanik.ru/stat.svg?user=ivanik&blankcolor=bebebe&mincolor=79a9cf&maxcolor=79a9cf&textcolor=000000
[/img]
```

## Разработка

Основной код написан мной, когда я ещё не умел красиво программировать. Сорри.

```
npm ci
npm run build
npm run start
```

Библиотека `canvas` может просто так не собраться. Нужно будет поставить пакеты из таблички <https://www.npmjs.com/package/canvas>

Для прода собираю докер, см. паплайн github ci
