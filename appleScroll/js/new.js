(() => {
	let yOffset = 0; //window.pageYOffset 대신 쓸 함수
	let prevScrollHeight = 0; //현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; //현재 활성화된 씬
	let enterNewScene = false; //새로운 씬이 시작된 순간 true

	const sceneInfo = [
		{
			//0
			type: "sticky",
			heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
			scrollHeight: 0,
			objs: {
				container: document.querySelector("#scroll-section-0"),
				messageA: document.querySelector("#scroll-section-0 .main-message.a"),
				messageB: document.querySelector("#scroll-section-0 .main-message.b"),
				messageC: document.querySelector("#scroll-section-0 .main-message.c"),
				messageD: document.querySelector("#scroll-section-0 .main-message.d"),
			},
			values: {
				messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],
				messageA_opacity: [0, 1, { start: 0.3, end: 0.4 }],
			},
		},
		{
			//1
			type: "normal",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector("#scroll-section-1"),
			},
		},
		{
			//2
			type: "sticky",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector("#scroll-section-2"),
			},
		},
		{
			//3
			type: "sticky",
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector("#scroll-section-3"),
			},
		},
	];

	function setLayout() {
		for (let i = 0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}

		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= window.pageYOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute("id", `show-scene-${currentScene}`);
	}

	function calcValues(values, currentYOffset) {
		let rv;
		//현재 씬에서 스크롤된 범위를 비율로 구하기
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

		if (values.length === 3) {
			//start - end 사이에 애니메이션 실행
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;
			rv = ((currentYOffset - partScrollHeight) / partScrollHeight) * (values[1] - values[0]) + values[0];
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

		return rv;
	}

	function playAnimation() {
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;

		console.log();

		switch (currentScene) {
			case 0:
				let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
				objs.messageA.style.opacity = messageA_opacity_in;
				//console.log(messageA_opacity_in);
				break;
			case 1:
				console.log("1 play");
				break;
			case 2:
				console.log("2 play");
				break;
			case 3:
				console.log("3 play");
				break;
		}
	}

	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0;
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight; //currentScene이 반복문보다 작을때만 prevScrollHeight값에 scrollHeight값을 더한다
		}
		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			currentScene++;
			document.body.setAttribute("id", `show-scene-${currentScene}`);
		}
		if (yOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) return;
			currentScene--;
			document.body.setAttribute("id", `show-scene-${currentScene}`);
		}

		if (enterNewScene) return;
		playAnimation();
	}

	//window.addEventListener("DOMContentLoaded"); //돔트리만 로드되어도 실행
	window.addEventListener("load", setLayout); //돔트리 + 마지막 이미지까지 로드되고서 실행
	window.addEventListener("resize", setLayout);
	window.addEventListener("scroll", () => {
		yOffset = window.pageYOffset;
		scrollLoop();
	});
})();
