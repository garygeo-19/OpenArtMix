# Open Art Mix
A art scripting platform that passes canvases from one image modifier to another to enable compound effects.  A great way to experience the variety and innovation of art stripting and generative art.  

Try it out at [OpenArtMix.com](https://www.openartmix.com).

#How does it work?
Open Art Mix is set up with independent modifiers that are stand alone html and javascript files.  Each one will have a frameCanvasIn to receive a canvas from the previous modifier and a frameCanvasOut to pass the modified image out.  This is set in an iframe that is dynamically added to the main index page.  When a transfer occurs the main page will take the canvas from the transfering iframe and copy it to the subsequent iframe.

These modifiers (aka Widgets) can be added in a chain, passing the modified canvases building up the effects.

## Contributing to Open Art Mix
If you have a script that you would like to contribute the basic steps are:
1. Set up your script to acccept a input canvas (frameCanvasIn) and present an output canvas (canvasFrameOut).
2.  Add an event listen for messages from the parent window

```  window.addEventListener("message", receiver, false);```

3. Add a function to update the canvas and resize the window when a new canvas image is received:
```
                function receiver(message) {
                //do something here when a new image has been set in the frameCanvasIn.
                    xxxxxxxxxx
                //let the parent window know to update the size of the frame
                parent.postMessage('updateSize');
            }
```
3.  Make an entry in the mods.json file including the name, path and attribution of your modifer.            