var timeout = []
$(document).ready(function() {

    if ($dir) {
        $('.overlay').show()
        loadDirectory($dir)
    } else {
        // Load current directory files/folders
        if (!window.location.hash)
            window.location.hash = 'home'
        else
            loadDirectory()

        $(window).on('hashchange', function() {
            $('.overlay').show()
            loadDirectory()
        })
    }

    $.fn.res = function(){
        var ec = $('.scrollbar')

        //$('.overlay').css({width:ec.width()+20,height:ec.height()+20}).show()

        $(window).on('resize', function(){
            ec = $('.scrollbar')
            //$('.overlay').css({width:ec.width()+20,height:ec.height()+20})
        })
    }

    $.res = function(){$(document).res()}
    $.res()
})

function loadDirectory(dir) {
    var hash = window.location.hash.substr(1)
    if (typeof title === 'undefined') title = document.title
    if (!dir && !hash) window.location.hash = 'home'
    dir = dir ? dir : (hash?hash:'.')
    $_dir = dir
    var l = ''

    if (dir.slice(-1) === '/')
        dir = dir.slice(0, -1)

    $('.navbar-text').html('')
    $.each(dir.split('/'), function(i,n){
        l += n + '/'
        n = n==='home'?'Home':n
        if ($dir) l = l.replace('home/', $base)
        if (i+1 < dir.split('/').length)
            $('.navbar-text').append('<a href="'+($dir?'':'#')+l.slice(0, -1)+($dir?'/':'')+'">'+n.replace(/\+/g,' ')+'</a><span class="divider">/</span>')
        else
            $('.navbar-text').append(n.replace(/\+/g,' '))
    })

    dir = dir === 'home' ? '' : dir.replace('home/', '')
    document.title = dir ? dir.replace(/\+/g,' ') + ' - ' + title : title

    $.ajax({
        url:     $base + 'browser?dir=' + dir,
        type:    'get',
        success: function(obj) {
            $('#download-dir').show()
            var ul = $('#directory-listing')
            var dir = obj.directory
            ul.html('')

            if (Object.keys(dir).length === 1)
                $('#download-dir').hide()

            if (obj.messages.length) {
                $.each(obj.messages, function(i,d){
                    $('.scrollbar').prepend(
                        $('<div/>',{
                            class:'alert alert-'+d.type,
                            html:'<span>'+d.text+'</span><a class="close" data-dismiss="alert" href="javascript:void(0)">&times;</a>'
                        })
                    )
                })
            }

            $.each(dir, function(name,info){
                var sa = $('<span/>', {class:'file-name col-md-7 col-sm-6 col-xs-9',html:$('<i/>',{class:'fa '+info.icon_class+' fa-fw'})}).append(name)
                var sc = $('<span/>', {class:'file-modified col-md-3 col-sm-4 hidden-xs text-right',text:info.mod_time})
                var sb = $('<span/>', {class:'file-size col-md-2 col-sm-2 col-xs-3 text-right',text:info.file_size})
                var li = $('<li/>',{'data-name':name,'data-href':info.url_path})
                var url = info.url_path.replace('?dir=', '#home/')
                url = name === '..' && url.indexOf('#home') === -1 ? '#home' : info.url_path.replace('?dir=', ($dir?'':'#home/'))

                url = $dir ? $base + url : url

                var linkData = (info.icon_class=== 'fa-picture-o'?{'data-magnify':'gallery'}:{})
                var link = $('<a/>',$.extend({},{class:'clearfix',href:url,'data-name':name},linkData)).append(
                    $('<div/>',{class:'row'}).append(sa)
                                             .append(sb)
                                             .append(sc)
                ).appendTo(li)
                if (info.is_file)
                    $(li).append(
                        $('<a/>',{
                            href:'javascript:void(0)',
                            class:'file-info-button',
                            html:'<i class="fa fa-info-circle"></i>'
                        }).click(function(event) {
                            $('#file-info-modal .modal-title').text(name)
                            $('#file-info .md5-hash').text('Carregando...')
                            $('#file-info .sha1-hash').text('Carregando...')
                            $('#file-info .sha256-hash').text('Carregando...')
                            $.ajax({
                                url:     $base + 'browser?hash=' + url.replace($base, ''),
                                type:    'get',
                                success: function(hash) {
                                    $('#file-info .md5-hash').text(hash.md5)
                                    $('#file-info .sha1-hash').text(hash.sha1)
                                    $('#file-info .sha256-hash').text(hash.sha256)
                                }
                            })
                            $('#file-info-modal').modal('show')
                            event.preventDefault()
                        })
                    )
                ul.append(li)

                $(link).on('click', function(){
                    if(!$(this).data('magnify')) {
                        $('.magnify-button-close').click()
                        $('.overlay').show()
                    }
                })
            })

            $("[data-magnify]").magnify({
                headerToolbar: ['open_img', 'close'],
                multiInstances: false,
                resizable: false,
                footerToolbar: []
            });

            $('.overlay').fadeOut()
            $('.alert').each(function(i,e){
                if (timeout[i] !== 'undefined')
                    timeout[i] = setTimeout(function(){
                        $(e).fadeOut(function(){$(this).remove()})
                    }, 5000)
            })
        }
    })
}