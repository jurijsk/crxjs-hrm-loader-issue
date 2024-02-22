


bug report for [crxjs/chrome-extension-tools](https://github.com/crxjs/chrome-extension-tools)



Imagine 2 files:
1.  `entry.js` referenced and load from `service-script-loader.js` that imports `another.js`
2.  and `another.js` imported to `entry.js`. 

So this 2 files reference each other, that happens but not an issue since postpone any execution `runtime.onInstall`, and it all works on initial `vite dev`.

Problems starts when update one of the files. If you update `another.js` the `entry.js`, the plugin will reload  and the following chain of events will happed.
1. `service-script-loader.js` will import un-timestamped `entry.js` since loader is only emitted once at the launch of `vite`
2. `entry.js` will reference and import timestamped `another.js?t=xxx` since `entry.js` is dynamically generated.  
3. `another.js?t=xxx` will import timestamped `entry.js?t=xxx`


Browser thinks that `entry.js` and `entry.js?t=xxx` are two different modules and executes the code twice.

I'm not familiar with rollup and vite plugins enough to attempt to fix it myself, but if someone is wiling to give me advice on how to reemit `service-script-loader.js` on HRM event, I'm  wiling to try.


For now the workaround I use is to add static one line entry point that only `import './entry.js'`


## Repro

1. run 'vite'
2. install the extension
3. change ./another to cause `reload`
4. get some.



