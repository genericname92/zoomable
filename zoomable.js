$.Zoomable = function(el){
  this.$el = $(el);
  this.activeBox = false;
  this.showHoverBox(this.$el);
};

$.Zoomable.prototype.showHoverBox = function($el){
  var zoom = this;
  zoom.$el.mouseenter(function(event){
    zoom.activeBox = true;
    var newBox = $('<div class="focus-box"></div>');
    zoom.$focusBox = newBox;
      zoom.$el.append(newBox);
      zoom.$el.mousemove(function(event){
        zoom.moveBox(event, newBox);
      });
      zoom.removeHoverBox();
  });
};

$.Zoomable.prototype.moveBox = function(event, $target){
  $target.css({top: event.pageY - $target.height() / 2, left: event.pageX - $target.width() / 2});
  if (this.$el.offset().top > $target.offset().top ) {
    $target.css({ top: this.$el.offset().top });
  }
  if (this.$el.offset().left > $target.offset().left) {
    $target.css({ left: this.$el.offset().left });
  }
  if (this.$el.offset().left + this.$el.width() < $target.offset().left + $target.width()){
    $target.css({ left: this.$el.offset().left + this.$el.width() - $target.width() });
  }
  if (this.$el.offset().top + this.$el.height() < $target.offset().top + $target.height()){
    $target.css({ top: this.$el.offset().top + this.$el.height() - $target.height() });
  }
  this.showZoom();
};

$.Zoomable.prototype.removeHoverBox = function(){
  var zoom = this;
  zoom.$el.mouseleave(function(event){
    if (zoom.activeBox){
      zoom.$focusBox.remove();
      zoom.activeBox = false;
    }
  });
};
$.Zoomable.prototype.showZoom = function () {
  var img = this.$el.find('img');
  var ratio = (this.$el.width() / this.$focusBox.width());
  if (!this.zoomed) {
    this.zoomed = true;
    this.$zoom = $('<div class="zoomed-image"></div>');
    this.$zoom
          .css('background-image', 'url(' + this.$el.find('img').attr('src') + ')')
          .css('width', this.$el.width())
          .css('height', this.$el.width())
          .css('background-size', this.$el.width() * ratio);

    $('body').append(this.$zoom);
  }
  var xScale = this.$focusBox.offset().left * ratio;
  var yScale = this.$focusBox.offset().top * ratio;
  this.$zoom.css('background-position', '-'+ xScale + 'px -' + yScale + 'px');
};





$.fn.zoomable = function () {
  this.each( function(){
    new $.Zoomable(this);
  });
};
