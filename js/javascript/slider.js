var id,p,n;
var slider_s;

function slider(id,p,n){
	this.container=document.getElementById(id);
	this.boxes= document.getElementById(id).children;
	this.imageNumber= this.boxes.length;
	this.imageHeight= parseInt($(this.boxes[0]).css('height'));
	this.boxMargin=parseInt($(this.boxes[0]).css('marginTop'));
	this.container.style.height = parseInt((this.imageHeight+this.boxMargin) * this.imageNumber) + 'px';
	this.prev=document.getElementById(p); 
	this.next=document.getElementById(n);
	this.currentPosition = 0;
	this.currentImage = 0;
}

function slider_init(slider){
	/*slider.container = document.getElementById(id);
	slider.boxes = slider.container.children;
	slider.imageNumber = slider.boxes.length;
	slider.imageHeight = slider.boxes[0].clientHeight;
	slider.boxMargin = parseInt($(slider.boxes[0]).css('marginTop'));
	slider.container.style.height = parseInt((slider.imageHeight+slider.boxMargin) * slider.imageNumber) + 'px';
	slider.prev = document.getElementById("prev");
	slider.next = document.getElementById("next");*/
	slider.prev.onclick = function(){ onClickPrev(slider);};
	slider.next.onclick = function(){ onClickNext(slider);};
}

function slider_animate(opts){
	var start = new Date;
	var id = setInterval(function(){
		var timePassed = new Date - start;
		var progress = timePassed / opts.duration;
		if (progress > 1){
			progress = 1;
		}
		var delta = opts.delta(progress);
		opts.step(delta);
		if (progress == 1){
			clearInterval(id);
			opts.callback();
		}
	}, opts.delay || 10);
}

function slideTo(imageToGo,slider){
	var direction;
	var numOfImageToGo = Math.abs(imageToGo - slider.currentImage);
	// slide toward left

	direction = slider.currentImage > imageToGo ? 1 : -1;
	slider.currentPosition = -1 * slider.currentImage * (slider.imageHeight+slider.boxMargin);
	var opts = {
		duration:500,
		delta:function(p){return p;},
		step:function(delta){
			slider.container.style.top = parseInt(slider.currentPosition + direction * delta * (slider.imageHeight+slider.boxMargin) * numOfImageToGo) + 'px';
		},
		callback:function(){slider.currentImage = imageToGo;}	
	};
	slider_animate(opts);
}

function onClickPrev(slider){
	if (slider.currentImage == 0){
		return;
	} 		
	else{
		slideTo(slider.currentImage - 1,slider);
	}		
}

function onClickNext(slider){
	if (slider.currentImage == slider.imageNumber - 3){
		return;
	}		
	else{
		slideTo(slider.currentImage + 1,slider);
	}		
}




