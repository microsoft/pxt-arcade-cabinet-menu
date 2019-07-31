# MakeCode Arcade Cabinet Menu

The application that lets you launch multiple games on Rpi0.

## How to deploy this program

* [ ] install node.js 8.9.4
* [ ] install and setup PXT command line
```
npm install -g pxt
pxt target arcade
```
* [ ] build an [arcade cabinet](https://arcade.makecode.com/hardware/raspberry-pi)
* [ ] build .uf2 file
```
pxt build --i --hw rpi
```
* [ ] connect your computer to the Raspberry Pi 0.
* [ ] copy generated ``arcade-menu.uf2`` file to the ``ARCADE`` drive 

## Supported targets

* for PXT/arcade
(The metadata above is needed for package search.)

# Microsoft Open Source Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

Resources:

- [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/)
- [Microsoft Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
- Contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with questions or concerns
