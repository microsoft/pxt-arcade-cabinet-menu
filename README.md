---
---
# MakeCode Arcade Cabinet Menu [![Build Status](https://travis-ci.org/microsoft/pxt-arcade-cabinet-menu.svg?branch=master)](https://travis-ci.org/microsoft/pxt-arcade-cabinet-menu)

The application that lets you launch multiple games on Rpi0.

## How to build this menu into the Pi0

* open https://arcade.makecode.com/beta
* import https://github.com/microsoft/pxt-arcade-cabinet-menu
* download for Pi0
* drag and drop into the ARCADE drive on the Pi0. it will replace the existing menu.

## How to build locally

- [ ] install node.js 8.9.4
- [ ] install and setup PXT command line
```
npm install -g pxt
pxt target arcade
```
- [ ] build an [arcade cabinet](https://arcade.makecode.com/hardware/raspberry-pi)
- [ ] build .uf2 file
```
pxt build --i --hw rpi
```
- [ ] connect your computer to the Raspberry Pi 0.
- [ ] copy generated ``arcade-menu.uf2`` file to the ``ARCADE`` drive 

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)

# Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

Resources:

- [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/)
- [Microsoft Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
- Contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with questions or concerns

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("https://arcade.makecode.com/", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
