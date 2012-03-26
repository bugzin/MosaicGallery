
generateRand = (min, max) ->
  while _results.length < max
    rand = Math.ceil Math.random() * max
    found = false
    for el in _results
      if el is rand 
        found = true 
        break
    if not found then rand else continue 
        
(   $.fn.imgg = (options) ->
      settings =
        _rows: 3
        _cols: 3
        anim: "fadein"
        duration: 300
        height: 400
        width: 400

      if options? 
        $.extend settings, options 

      if options? and options.images?
        #unless typeof options.images is "Array" 
        if typeof options.images isnt "Array"
          if options.images.length <=0
            alert "Please provide images"
            return false

      [i, j, x, y, index, idx] = [0, 0, 0, 0, 0, 1]  

      {_rows, _cols, duration, images} = settings
      h = settings.height / _cols
      w = settings.width / _rows

      currentImage = images[0]
      el = $('<div id="img_g"/>').css('background-image',"url(#{currentImage})");

      @.append el

      el.height(settings.height).width(settings.width).css 'position','relative'

      while i++ < _rows
        while j++ < _cols
          el.append $('<div id=id_' + i + '_' + j + ' class="tile" />').css('left', w * (j - 1)).css('top', h  * (i - 1)).css('background-position',  (-(w * (j - 1))) + 'px ' + -(h  * (i - 1)) + 'px')
        j = 0
      
      el.children().css('position','absolute').height(h).width(w)

      i = j = 0
      while i++ < _rows
        @.append $('<div class="gridY" />').css('top', y = y + h).width settings.width 

      while j++ < _cols
        @.append $('<div class="gridX" />').css('left',x = x + w).height(settings.height)

      arr = generateRand 0, _rows * _cols
      interval = ""
      animate = () ->
        el.children(":nth-child(#{arr[index]})")
        .fadeIn 'slow'
        index++
        if index >= arr.length
          index = 0 
          clearInterval interval
          setTimeout start, 1000
        yes

      imgNext = () ->
        el.css('background-image',"url(#{currentImage})");
        el.children('.tile').hide();
        currentImage = images[idx++]; 
        el.children().css('background-image',"url(#{currentImage})");

      start = () ->
        imgNext()
        interval = setInterval animate, duration
        if idx >= images.length
          idx = 0
          arr = generateRand 0, _rows * _cols
          yes 

      setTimeout start, 1000 
      @
)