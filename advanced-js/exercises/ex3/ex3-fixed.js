var Widget = {
	setDimensions: function(width,height){
		this.width = width || 50;
		this.height = height || 50;
		this.$elem = null;
	},
	buildDOMElement: function($where){
		if (this.$elem) {
			this.$elem.css({
				width: this.width + "px",
				height: this.height + "px"
			}).appendTo($where);
		}
	}
};

var Button = Object.assign(Object.create(Widget),{
	configure: function(width,height,label){
		// delegated call
		this.setDimensions(width,height);
		this.label = label || "Default";

		this.$elem = $("<button>").text(this.label);
	},
	activate: function($where) {
		// delegated call
		this.buildDOMElement($where);
		this.$elem.click(this.onClick.bind(this));
	},
	onClick: function(evt) {
		console.log("Button '" + this.label + "' clicked!");
	}
});

$(document).ready(function(){
	var $body = $(document.body);

	var btn1 = Object.create(Button);
	btn1.configure(125,30,"Hello");

	var btn2 = Object.create(Button);
	btn2.configure(150,40,"World");

	btn1.activate($body);
	btn2.activate($body);
});
