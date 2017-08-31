new Vue({
	el: "#pomodoro",
	delimiters: ["${", "}"],
	  data: {
		taskM: "00",
		taskS: "00",
		breakM: "00",
		breakS: "00",
		s: 60,
		m: 0,
	//default
		set: 25,
		p: 0,
	//default
		pause: 5,
		time: 25,
		sessionInt: "",
		breakInt: "",
		pomodoro: 0
  },
	  methods: {
			
		setTimeLapse: function (time){
			this.set = time;
			this.m = time;
			this.time = time;
		},
			
		setPause: function (pause){
			this.pause = pause.toString();
			this.p = pause;
			this.pause = pause;
		},
			
		start: function (){
			this.checkState(1);
		},
			
		stop: function (){
			this.checkState(0);
		},
			
		reset: function (){
			this.checkState();
		},
			
		checkState: function(state){
		//checkUser Input for state
			switch(state){
					case(1):
					this.setTask();
					break;
					case(0):
					clearInterval(this.breakInt);
					clearInterval(this.sessionInt);
					break;
					default:
					clearInterval(this.breakInt);
					clearInterval(this.sessionInt);
					//set defaults
					this.taskM = "00";
					this.taskS = "00";
					this.breakM = "00";
					this.breakS = "00";
					this.s = 60;
					this.m = 0;
					this.set = 25;
					this.p = 0;
					this.pause = 5;
					this.time = 25;
					this.sessionInt = "";
					this.breakInt = "";
					this.pomodoro = 0;
					this.break;
									}
		},
	//Initialize and count down on pomodoro clock
		setTask: function (){
		//set state
			clearInterval(this.breakInt);
		//Turn on main display
			var timer = document.getElementById("timer");
			timer.classList.remove('off');
			var breaker = document.getElementById("break");
			if(!breaker.classList.contains('off')){
				breaker.classList.add('off');
			} 
		//Init main clock
			this.m = this.set;
			this.setMainMinutes();
			this.setMainSeconds();
			this.updateSessionClock();
		},
		setMainMinutes: function(){
		//Set main minutes
			if(this.m >= 10){
				this.taskM = this.m - 1;
				} else if(this.m < 10 && this.m > 1){
					this.taskM = "0" + (this.m - 1).toString();
				} else if (this.m === 1) {
					this.taskM = "00";
				} else if (this.m <= 0) {
						if(this.set >= 10) {
							this.taskM = this.set;
							} else if(this.set < 10 && this.set >= 1){
								this.taskM = "0" + this.set.toString();
						}
					this.taskM = "0" + this.m.toString();
					this.taskS = "00";
				//Track number of sessions
					this.updatePomodoro();
					alert("Time for a break!");
					this.setBreak();
				}
			},
			setMainSeconds: function(){
		//Ticker
					this.s -= 1;
		//Set main seconds
				if(this.s === 60){
					this.taskS = "00";
				} else if(this.s >= 10){
					this.taskS = this.s;
				} else if(this.s < 10 && this.s >= 0){
					this.taskS = "0" + this.s.toString();
				} else if(this.s < 0){
					this.s = 60;
					this.taskS = this.s;
					this.m -= 1;
					this.setMainMinutes();
				}
			},
			
	//Initialize and count down on break clock
		setBreak: function (){
		//set state
			clearInterval(this.sessionInt);
		//Turn on break display
			var breaker = document.getElementById("break");
			breaker.classList.remove('off');
			var timer = document.getElementById("timer");
			if(!timer.classList.contains('off')){
				timer.classList.add('off');
			}
		//Init break clock
			if(this.pomodoro < 4){
				this.p = this.pause;
			} else {
				alert("Time for a long break!");
				this.p = 30;
				this.updatePomodoro();
			}
				this.setBreakMinutes();
				this.setBreakSeconds();
				this.updateBreakClock();
		},
			setBreakSeconds: function(){
		//Ticker
				this.s -= 1;
		//Set break seconds
				if(this.s === 60){
					this.breakS = "00";	
				}	else if(this.s >= 10){
					this.breakS = this.s;
				} else if(this.s < 10 && this.s >= 0){
					this.breakS = "0" + this.s.toString();
				} else if(this.s < 0){
					this.s = 60;
					this.breakS = this.s;
					this.p -= 1;
					this.setBreakMinutes();
				}
			},
			setBreakMinutes: function(){
		//Set minutes
			if(this.p >= 10){
				this.breakM = this.p - 1;
				} else if(this.p < 10 && this.p > 1){
					this.breakM = "0" + (this.p - 1).toString();
				} else if (this.p === 1) {
					this.breakM = "00";
				} else if (this.p <= 0) {
						if(this.pause >= 10) {
							this.breakM = this.pause;
							} else if(this.pause < 10 && this.pause >= 1){
								this.breakM = "0" + this.pause.toString();
						}
					this.breakM = "0" + this.p.toString();
					this.breakS = "00";
					if(this.pomodoro < 4){
						alert("Back to work!");
						this.setTask();
					}
				}
			},
	//Pomodoro Tracker
			updatePomodoro: function (){
				var checks = document.getElementsByClassName('check');
				if(this.pomodoro < 4){
					this.pomodoro += 1;
					checks[this.pomodoro - 1].classList.add("active");
				} else {
					this.pomodoro = 0;
					for(var i = 0; i < checks.length; i++){
						checks[i].classList.remove("active");
					}
				}
			},
	//Timer controllers
		updateSessionClock: function (){
			this.sessionInt = setInterval(function(){
				this.setMainSeconds();
			}.bind(this), 1000);
  		},
		updateBreakClock: function (){
			this.breakInt = setInterval(function(){
				this.setBreakSeconds();
			}.bind(this), 1000);
  		}
		}
});
