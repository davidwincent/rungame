require.config({
    paths: {
        gamejs: 'libs/gamejs/gamejs'
    }
});


require(["gamejs", "modules/helpers/sprite_sheet"], function(gamejs, spriteSheet) {
    var Bugz = function(rect) {
        // call superconstructor
        Bugz.superConstructor.apply(this, arguments);

        this.STILL = 0;
        this.LEFT = 1;
        this.RIGHT = 2;
        this.JUMP = 3;

        var spriteSpecs = {width:16, height:16};
        this.spriteSheet = new spriteSheet.SpriteSheet("images/RTR_TomasSpritesheet.png", spriteSpecs);
        this.currentSprite = 0;
        this.lastSprite = 3;
        this.moveBy = 10;
        this.moving = this.STILL;
        this.rect = new gamejs.Rect(rect);
        //console.log(this.spriteSheet);
        this.surface = this.spriteSheet.get(this.currentSprite);
        this.mask = gamejs.mask.fromSurface(this.surface);
        return this;
    };
    // inherit (actually: set prototype)
    gamejs.utils.objects.extend(Bugz, gamejs.sprite.Sprite);
    // update
    Bugz.prototype.update = function(msDuration) {
        /*
        if (this.moving == this.STILL) {
            return;
        }
        */
        // moveIp = move in place
        this.rect.moveIp(0, 0);
        this.surface = this.spriteSheet.get(this.currentSprite);
        this.currentSprite++;
        if (this.currentSprite > this.lastSprite) this.currentSprite = 0;
    };
    // draw
    Bugz.prototype.draw = function(display) {
        display.blit(this.surface, this.rect);
    };

    gamejs.preload(["images/RTR_TomasSpritesheet.png"]);
    gamejs.ready(function(){
        // screen setup
        console.log("setting up screen");
        gamejs.display.setMode([800, 600]);
        gamejs.display.setCaption("Run ... run!");

        var bugz = new Bugz([50, 500, 16, 16]);
        // game loop
        var mainSurface = gamejs.display.getSurface();
        // msDuration = time since last tick() call
        var tick = function(msDuration) {
            mainSurface.fill("#eee");
            bugz.update(msDuration);
            bugz.draw(mainSurface);
        };
        gamejs.time.fpsCallback(tick, this, 8);
    });
});