/**

 Auto-Loop Webms
 v0.0.1
 Zach Adams - zach@zach-adams.com
 Copyright (C) 2017 Zachary Adams

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 {http://www.gnu.org/licenses/}

 “You never know what worse luck your bad luck has saved you from.”
 ~ Cormac McCarthy, No Country For Old Men

 **/

(function () {
	'use strict';

	let debug = false,
		observer,
		videos;

	function log(text) {
		if (debug === true) {
			console.log(text);
		}
	}

	// Apply auto loop to single video element
	function setVideoAutoLoop(video) {

		// Video could use src or currentSrc
		let source = video.currentSrc || video.src;
		source = source.split('?')[0];

		// Not a webm, this isn't the video tag we're looking for.
		if (!source.endsWith('webm')) {
			return;
		}

		log("Video found, setting loop to true.");

		// The magic happens
		video.loop = true;

	}

	// Apply auto loop to array of video elements if they're not already looped
	function applyVideoAutoLoopToElements(videos) {

		videos.forEach(function (video) {

			if (!video.ready) {

				setVideoAutoLoop(video);

				video.ready = true;

			}

		});

	}

	// Make an observer so we can spot any errant videos that get added
	observer = new MutationObserver(function (mutations) {

		mutations.forEach(function (mutation) {
			Array.from(mutation.addedNodes).forEach(function (newNode) {

				let videos = [];

				if (newNode.tagName == "VIDEO") {
					videos = new Array(newNode);
				} else if (newNode.nodeType === 1 || newNode.nodeType === 9 || newNode.nodeType === 11) {
					videos = Array.from(newNode.getElementsByTagName('video'));
				}

				if (videos.length !== 0) {
					log(videos);
					applyVideoAutoLoopToElements(videos);
				}

			});
		});

	});

	// Initialization

	videos = Array.from(document.getElementsByTagName('video'));

	applyVideoAutoLoopToElements(videos);

	observer.observe(document.body, {
		childList: true,
		subtree: true
	});

})();