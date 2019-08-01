namespace swarm {
    class Pixel {
        step = 0

        constructor(
            public color: number,
            public x: number,
            public y: number) { }
    }

    class SwarmAnim implements SpriteLike {
        private postable: number[]
        private pixels: Pixel[] = []
        srcpos: number
        teardownimg: Image
        buildupimg: Image
        origimg: Image
        x: number
        y: number
        id: number
        z = 0
        pixPerFrame: number

        // duration is quite approximate
        constructor(public srcsprite: Sprite,
            duration = 1000, acceleration = 0.5,
            private done: () => void) {
            this.postable = this.mkPosTable(acceleration)
            this.srcpos = 0
            this.origimg = srcsprite.image
            this.teardownimg = this.origimg.clone()
            this.buildupimg = this.origimg.clone()
            this.buildupimg.fill(0)
            srcsprite.setImage(this.buildupimg)
            this.x = srcsprite.left
            this.y = srcsprite.top

            duration -= this.postable.length * 13
            if (duration < 500) duration = 500

            this.pixPerFrame = (this.countPixels(this.teardownimg) * 10 / duration) << 8

            game.currentScene().addSprite(this)
        }

        private countPixels(img: Image) {
            let cnt = 0
            for (let x = 0; x < img.width; ++x)
                for (let y = 0; y < img.height; ++y)
                    if (img.getPixel(x, y)) cnt++
            return cnt
        }

        __serialize(offset: number): Buffer {
            return undefined;
        }

        __update(camera: scene.Camera, dt: number) {
            const dt2 = (dt * 100) | 0
            const numpx = (dt2 * this.pixPerFrame) >> 8
            for (let i = 0; i < numpx; ++i) {
                const px = this.pickPixel()
                if (px)
                    this.pixels.push(px)
            }

            let hasDone = false

            for (let px of this.pixels) {
                px.step += dt2
                if (px.step >= this.postable.length) {
                    hasDone = true
                }
            }
            if (hasDone) {
                this.pixels = this.pixels.filter(px => {
                    if (px.step >= this.postable.length) {
                        this.buildupimg.setPixel(px.x, px.y, px.color)
                        return false
                    }
                    return true
                })
                if (this.pixels.length == 0) {
                    game.currentScene().allSprites.removeElement(this);
                    this.srcsprite.setImage(this.origimg)
                    if (this.done)
                        this.done()
                }
            }
        }

        __draw(camera: scene.Camera) {
            const x = this.srcsprite.left + camera.drawOffsetX
            const y = this.srcsprite.top + camera.drawOffsetY

            for (let px of this.pixels) {
                const xx = x + px.x + this.postable[px.step]
                const yy = y + px.y
                screen.setPixel(xx, yy, px.color)
            }
        }

        private mkPosTable(acc: number) {
            const table: number[] = []
            let speed = 0
            let pos = 0
            while (pos < 160) {
                speed += acc
                pos += speed
                table.push(Math.round(pos))
            }
            table.reverse()
            return table
        }

        private pickPixel() {
            while (this.srcpos < this.teardownimg.width) {
                const px = this.pickPixelInLine()
                if (px) return px
            }
            return null // done
        }

        private pickPixelInLine() {
            const img = this.teardownimg
            let x = this.srcpos + Math.randomRange(0, img.width >> 4)
            if (x >= img.width)
                x = img.width - 1
            let y = Math.randomRange(0, img.height - 1)
            let wrap = false
            for (; ;) {
                const color = img.getPixel(x, y)
                if (color) {
                    img.setPixel(x, y, 0)
                    return new Pixel(color, x, y)
                }
                y++
                if (y >= img.height) {
                    y = 0
                    if (wrap) {
                        if (x == this.srcpos)
                            this.srcpos++
                        return null
                    }
                    wrap = true
                }
            }
        }
    }

    export function swarmInSprite(img: Image, duration = 1000, acceleration = 0.5, done?: () => void) {
        const s = sprites.create(img)
        new SwarmAnim(s, duration, acceleration, done)
        return s
    }
}
