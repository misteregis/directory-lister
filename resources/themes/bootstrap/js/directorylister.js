var $dir, $_dir;

$(document).ready(function() {

    var _dir = $('script[src]').filter(function(a,b){return $(b).attr('src').indexOf("dir=") !== -1})
    if (_dir.length) $dir = _dir.attr('src').split('=')[1]

    // Get page-content original position
    var contentTop = $('#directory-listing').offset().top;

    // Show/hide top link on page load
    showHideTopLink(contentTop);

    // Show/hide top link on scroll
    $('.scrollbar').scroll(function() {
        showHideTopLink(contentTop)
    });

    // Scroll page on click action
    $('#page-top-link').click(function() {
        $('.scrollbar').animate({ scrollTop: 0 });
        return false;
    });

    // Hash button on click action
    $('.file-info-button').click(function(event) {

        // Get the file name and path
        var name = $(this).closest('li').attr('data-name');
        var path = $(this).closest('li').attr('data-href');

        // Set modal title value
        $('#file-info-modal .modal-title').text(name);

        $('#file-info .md5-hash').text('Carregando...');
        $('#file-info .sha1-hash').text('Carregando...');
        $('#file-info .filesize').text('Carregando...');

        $.ajax({
            url:     '?hash=' + path,
            type:    'get',
            success: function(data) {

                // Parse the JSON data
                var obj = data;

                // Set modal pop-up hash values
                $('#file-info .md5-hash').text(obj.md5);
                $('#file-info .sha1-hash').text(obj.sha1);
                $('#file-info .filesize').text(obj.size);

            }
        });

        // Show the modal
        $('#file-info-modal').modal('show');

        // Prevent default link action
        event.preventDefault();

    });

    // Hash button on click action
    $('#download-dir').click(function(event) {
        var dir = $_dir.replace('home/', '');

        $('.overlay').show();
        $(this).blur();

        $.ajax({
            url: $base + 'browser.zip?dir=' + dir,
            type: 'get',
            xhrFields: {
                responseType: 'blob'
            },
            success: function(data) {
                if (dir.slice(-1) === '/')
                    dir = dir.slice(0, -1);

                var filename = dir.split('/').pop(),
                a = document.createElement('a'),
                url = window.URL.createObjectURL(data);
                a.href = url;
                a.download = `${filename}.zip`;
                document.body.append(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                $('.overlay').fadeOut();
            }
        });

        // Prevent default link action
        event.preventDefault();

    });

});

function showHideTopLink(elTop) {
    if($('#directory-listing').offset().top < elTop) {
        $('#page-top-nav').fadeIn();
    } else {
        $('#page-top-nav').fadeOut();
    }
}
