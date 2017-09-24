var gData;
/*
    Draw the toolbox with an array of spreadsheet data
    and cache the data in a global variable.
*/
function initialize(data) {
    gData = data
    drawToolBox(data)
}

function drawToolBox(data) {
  var tools = ich.tools({
    'rows': data
  })
  $('#tools').html(tools)
  console.log(data)
}

$(document).on( 'click', '#showAvailable', toggleAvailable)

$(document).on( 'click', '.clear', function(e) {
  clearSearch(e)
  toggleAvailable(false)
})

$(document).on('keyup search', '#toolSearch', function(e) {
  var text = $(e.target).val().trim().toLowerCase()
  if (text === '') return clearSearch(e)
  filterTools(text)
})

$(document).on( 'click', '.tool-box-tool', function(e) {
  var rowNumber = $(this).closest("div").attr("id")
  if ($(this).closest('div').hasClass('selected-tool')) {
    $('.tool-box-bottom' + '.' + rowNumber).css('display', 'none')
    $(this).closest('div').removeClass('selected-tool')
  }
  else {
    $('.tool-box-bottom' + '.' + rowNumber).css('display', 'inherit')
    $(this).closest('div').addClass('selected-tool')
    // console.log("selected" + ' ' + rowNumber)
  }
})

$(document).on( 'click', '.tool-box-borrow', function(e) {
  var rowNumber = $(this).closest("div").attr("id")
  if ($(this).closest('span').hasClass('toggled')) {
    $('.ui-preview' + '.' + rowNumber).css('display', 'none')
    $(this).closest('span').removeClass('toggled')
  }
  else {
    $('.ui-preview' + '.' + rowNumber).css('display', 'inherit')
    $(this).closest('span').addClass('toggled')
    console.log("selected" + ' ' + rowNumber)
  }
})

/*
    Toggle whether unavailable items are displayed or not

    [state] - optionally specify the desired state, either true or false. If
    not defined, it will just toggle.
*/
function toggleAvailable(state) {
    // Since #showAvailable and #tools both start out without the class, they
    // will remain in sync
    let button = $('#showAvailable').toggleClass('button-pressed', state)
    // CSS in site.css hides tools that are '.show-available .not-available'
    $('#tools').toggleClass('show-available', state)

    // Update the button text
    if (button.hasClass('button-pressed')) {
        button.html("显示全部")
    } else {
        button.html("显示在售")
    }
}

function clearSearch(e) {
  console.log('clear')
  $('#toolSearch').val('')
  drawToolBox(gData)
}

// TODO: 加入按作者和标签搜索功能
function filterTools(text) {
  $('.tool-box-tool').each(function() {
  var tool = $(this).html().toLowerCase()
  var author = $(this).attr("author")
  if (tool.match(text) || author.match(text)) {
    $(this).parent().removeClass('filtered')
} else $(this).parent().addClass('filtered')
  })
}
