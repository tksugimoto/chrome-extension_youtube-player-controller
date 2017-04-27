const execScript = fn => {
	const script_text = `(${fn.toString()})()`;
	const script = document.createElement("script");
	script.appendChild(document.createTextNode(script_text));
	const parent = document.head;
	parent.appendChild(script);
	parent.removeChild(script);
};

execScript(() => {
	"use strict";

	document.body.addEventListener("wheel", evt => {
		if (evt.deltaY === 0) return;

		const volumePanel = evt.target.closest("#movie_player .ytp-volume-panel");
		if (volumePanel) {
			// YouTube公式のボリューム変更バー
			return;
		}

		const videoArea = evt.target.closest("#movie_player .html5-video-container video");
		if (videoArea) {
			// 下方向回転でボリュームを小さくする
			Video.changeVolume(-5 * Math.sign(evt.deltaY));
			evt.preventDefault();
			return;
		}
		const bottomBar = evt.target.closest("#movie_player .ytp-chrome-bottom");
		if (bottomBar) {
			// 下方向回転で先送り
			Video.seekBy(5 * Math.sign(evt.deltaY));
			evt.preventDefault();
			return;
		}
	});

	const getPlayer = () => {
		return document.getElementById("movie_player");
	};
	const Video = {
		changeVolume: diff => {
			const player = getPlayer();
			let volume = player.getVolume() + diff;
			player.setVolume(volume);
			if (player.isMuted()) player.unMute();
		},

		seekBy: diff => {
			getPlayer().seekBy(diff);
		}
	};
});
