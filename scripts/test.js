require.config({
    baseUrl: './',
    // ...
    packages: [
        {
          name: 'physicsjs',
          location: 'scripts/PhysicsJS-0.7.0/dist',
          main: 'physicsjs-full.js'
        }
    ],
    //...
});
console.log('go')
$('document').ready(function(){


    require([
        'physicsjs',
        'physicsjs/renderers/canvas',
        'physicsjs/behaviors/constant-acceleration',
        'physicsjs/behaviors/edge-collision-detection',
        'physicsjs/behaviors/body-impulse-response',
        'physicsjs/behaviors/body-collision-detection',
        'physicsjs/behaviors/sweep-prune',

        'physicsjs/bodies/circle',
        'physicsjs/bodies/convex-polygon'
    ], function( Physics ){
            Physics.body('jumpCircle', 'circle', function(parent){
                return {
                    jump: function(){
                        console.log('accelerate!')
                        this.accelerate(Physics.vector(0,-0.2))
                    },
                    kick: function(speed){
                        console.log('kick!')

                        this.vy = speed
                    }
                }
            });
          Physics(function(world){
            var renderer = Physics.renderer('canvas', {
                el: 'viewport', // id of the canvas element
                width: 500,
                height: 500
            });
            world.add( renderer );

            var jumpy = Physics.body('jumpCircle', {
                  x: 250,
                  y: 500,
                  radius: 80

              });
            world.add( jumpy );
            world.render();
            world.add( Physics.behavior('constant-acceleration') );
          Physics.util.ticker.on(function( time, dt ){
              world.step( time );
          });
          var bounds = Physics.aabb(0, 0, 500, 500);
          world.add( Physics.behavior('edge-collision-detection', {
           aabb: bounds,
              restitution: 0.5
          }) );
// ensure objects bounce when edge collision is detected
         world.add( Physics.behavior('body-impulse-response') );
         //jumpy.jump()
          // start the ticker
          world.add( Physics.behavior('body-collision-detection') );
          world.add( Physics.behavior('sweep-prune') );
          Physics.util.ticker.start();

          world.on('step', function(){
              world.render();
          });
          world.sub
          $(document).keydown(function(e){
              console.log('jump')
              if (e.which == 32) {
                  world.one('step', function (data) {
                      jumpy.jump();
                  });
              }
          });
          $(document).keydown(function(e){
              if (e.which == 75) {
                  world.one('step', function (data) {
                      jumpy.kick(10);
                  });
              }
          })
        })

    });

});