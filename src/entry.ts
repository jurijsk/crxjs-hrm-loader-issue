import "./another";


declare const chrome: any;
chrome.runtime.onInstalled.addListener(()=> {
	console.log("you will see me twice if you change ./another.ts");
});