# Watermark Generator

**LoftSchool nov 2015 Team #1**

[![Build status](https://img.shields.io/badge/Version-1.0%20--%20Final-green.svg)](https://github.com/KoroljovPavel/Watermark-Generator-LS-work-3-team-one)

Watermark Generator — веб-сервис позволяющий производить наложение водяных знаков на другие изображения.

Сервис имеет базовые настройки по положению водяных знаков, прозрачности и пр. Более [подробно о возможностях сервиса](https://github.com/KoroljovPavel/Watermark-Generator-LS-work-3-team-one/wiki/%D0%92%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B0-Watermark-Generator) можно ознакомиться в [Wiki проекта](https://github.com/KoroljovPavel/Watermark-Generator-LS-work-3-team-one/wiki/).

## Содержание

* [Кратко о проекте](#watermark-generator)
* [Требования проекта](#Требования-проекта)
* [Быстрый старт](#Быстрый-старт)
* [Команда](#Команда)
* [История изменений](#История-изменений)
* [To-Do](#to-do)

## Требования проекта

### Для сборки

[![NodeJS](https://img.shields.io/badge/Node.JS-4.2.0+-green.svg)](https://nodejs.org/en/) [![npm](https://img.shields.io/badge/npm-2.14.10+-green.svg)](https://nodejs.org/en/) [![bower](https://img.shields.io/badge/bower-1.7.0+-green.svg)](http://bower.io/)

### Для сервера

[![PHP](https://img.shields.io/badge/PHP-5.4.0+-green.svg)](http://www.php.net/) [![PHP lib fileinfo](https://img.shields.io/badge/lib_fileinfo-any-green.svg)](http://www.php.net/) [![PHP lib GD](https://img.shields.io/badge/lib_gd-2.0.2+-green.svg)](http://www.php.net/) [![PHP lib imagick](https://img.shields.io/badge/lib_imagick-3.4.0+-green.svg)](http://pecl.php.net/package/imagick) 

### К браузерам

[![IE7 Not support](https://img.shields.io/badge/IE7-not_support-red.svg)](http://browsehappy.com/) [![IE8 semisupport](https://img.shields.io/badge/IE8-semisupport-yellow.svg)](http://browsehappy.com/) [![IE9+ Full support](https://img.shields.io/badge/IE9+-support-green.svg)](http://browsehappy.com/) [![Chrome support](https://img.shields.io/badge/Chrome_(last_3_version)+-support-green.svg)](http://browsehappy.com/) [![Firefox support](https://img.shields.io/badge/Firefox_(last_3_version)+-support-green.svg)](http://browsehappy.com/) [![Opera support](https://img.shields.io/badge/Opera_(last_3_version)+-support-green.svg)](http://browsehappy.com/) 

## Быстрый старт

### Локальный запуск проекта с поддержкой PHP

Для запуска проекта потребуется настройка видимости PHP в системе. [Подробная инструкция](https://github.com/KoroljovPavel/Watermark-Generator-LS-work-3-team-one/wiki/%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-PHP-%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F) по настройке в нашей Wiki.

```
$ git clone https://github.com/KoroljovPavel/Watermark-Generator-LS-work-3-team-one.git watermark-generator
$ cd watermark-generator
$ npm i
$ bower i
$ gulp server-php

```

В данном примере в качестве папки назначения используется **watermark-generator**. Вы можете изменить папку назначения на любую удобную вам.

### Сборка версии для использования на внешнем сервере

```
$ git clone https://github.com/KoroljovPavel/Watermark-Generator-LS-work-3-team-one.git watermark-generator
$ cd watermark-generator
$ npm i
$ bower i
$ gulp build

```

После сборки проекта скопируйте папку `watermark-generator/build` на ваш сервер, предварительно внеся изменения в файл конфигурации согласно инструкции.

## Команда

Над этим проектом работала команда учеников LoftSchool в составе:

* Королёв Павел — наш тимлид, результат работы во многом зависел именно от него. Сборщик проекта, организация процесса разработки, вдохновление команды — далеко не полный список обязанностей Павла.
* Карванова Кристина — наш самый лучший визуализатор ;). Верстка проекта полностью лягла на её хрупкие плечи, но работа Кристины не ограничилась версткой, она также реализовала несколько модулей на стороне клиента.
* Янулис Павел — опыт и сила команды. В обсуждении с Павлом появлялись идеи реализации и расширения функционала. Но не одними идеями он силен. Полный список его работы приведен на персональной страничке в нашей Wiki.
* Влад Подкаура выполнил модули загрузки изображений, ... и много других полезных улучшений. 
* Вялков Дмитрий — самый шумный в команде. Во многом благадаря этому члену нашей группы создавалась постоянное ощущение некоторого движения в сторону ~~„конца“~~ завершения проекта. Ах... да... еще он взял на себя работу на стороне сервера.

Кроме описанных модулей каждый член команды производил пуши, слияния веток, решал возникающие при этом конфликты и производил кросс тестирование и ревью кода для других членов команды.

[Более подробно в нашей Wiki](https://github.com/KoroljovPavel/Watermark-Generator-LS-work-3-team-one/wiki/%D0%9A%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0).

## История изменений

18.01.2016: Проект подготовлен к сдаче. Обозначена версия 1.0 Final

17.01.2016: В проект добавлена поддержка мощения вотермарками и производятся финальные правки перед сдачей проекта.

14.01.2016: Выложена первая версия. Полностью реализован функционал размещения единичного водяного знака.

10.01.2016: Выложена первая Alpha версия проекта. Реализованы загрузка изображений и их слияние, верстка соотвествует макету.

06.01.2016: Первый коммит проекта.

## To-Do

Что еще можно реализовать:

* изменение размеров водяного знака
* масштабирование рабочего поля
* **И еще много всего ;)**