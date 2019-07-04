# shikimori-stat

Генератор картинок со статистикой [Shikimori](https://shikimori.one/)

## Запрос картинки

Картинку можно получить по ссылке

```
https://ivanik.ru/shikimori-stat?user=428722&blankcolor=434343&mincolor=245652&maxcolor=009688&textcolor=ffffff
```

Параметры:

| Параметр     | Значение                                |
| ------------ | --------------------------------------- |
| `user`       | ID пользователя                         |
| `blankcolor` | Цвет пустых клеток                      |
| `mincolor`   | Цвет клеток при минимальной активности  |
| `maxcolor`   | Цвет клеток при максимальной активности |
| `textcolor`  | Цвет текста                             |

Все цвета передаются в HEX формате без решетки, например `textcolor=ffffff`

## Вставка на Shikimori

На Shikimori картинку можно вставить двумя способами:

Как постер. Он будет не кликабелен и автоматически принимает нужный размер.

```bbcode
[poster]
https://ivanik.ru/shikimori-stat?user=428722&blankcolor=434343&mincolor=245652&maxcolor=009688&textcolor=ffffff
[/poster]
```

Как картинку. Будет кликабельна, размер задается вручную.

```bbcode
[img 875x128]
https://ivanik.ru/shikimori-stat?user=428722&blankcolor=434343&mincolor=245652&maxcolor=009688&textcolor=ffffff
[/img]
```

## Получение ID пользователя

ID пользователя можно получить из ссылки на аватарку в названии файла.

Например в этой ссылке ID 428722.

```
https://moe.shikimori.one/system/users/x160/428722.png?1551451910
                                            ^^^^^^
```
