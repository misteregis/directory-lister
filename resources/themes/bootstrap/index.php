<!DOCTYPE html>
<html>

    <head>

        <title>Listando diretórios</title>
        <link rel="shortcut icon" href="<?php echo THEMEPATH; ?>/img/folder.png">

        <!-- STYLES -->
        <link rel="stylesheet" href="<?php echo ASSETSPATH; ?>/css/bootstrap.min.css">
        <link rel="stylesheet" href="<?php echo ASSETSPATH; ?>/fonts/font-awesome.min.css">
        <link rel="stylesheet" href="<?php echo ASSETSPATH; ?>/css/jquery.magnify.css">
        <link rel="stylesheet" type="text/css" href="<?php echo THEMEPATH; ?>/css/style.css">

        <!-- SCRIPTS -->
        <script type="text/javascript" src="<?php echo ASSETSPATH; ?>/js/jquery.min.js"></script>
        <script src="<?php echo ASSETSPATH; ?>/js/bootstrap.min.js"></script>
        <script src="<?php echo ASSETSPATH; ?>/js/jquery.magnify.js"></script>
        <script type="text/javascript" src="<?php echo THEMEPATH; ?>/js/directorylister.js<?php if (isset($_REQUEST['x'])) echo "?dir={$_REQUEST[x]}"?>"></script>
        <script src="<?php echo ASSETSPATH; ?>/js/main.js"></script>

        <!-- FONTS -->
        <link rel="stylesheet" type="text/css"  href="<?php echo ASSETSPATH; ?>/fonts/font.css">

        <!-- META -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">

        <?php file_exists('analytics.inc') ? include('analytics.inc') : false; ?>

    </head>

    <body data-theme="<?=isset($_COOKIE['theme'])?$_COOKIE['theme']:'dark'?>">

<?php file_exists($lister->getThemePath(true) . '/header.php') ? include($lister->getThemePath(true) . '/header.php') : include($lister->getThemePath(true) . "/default_header.php"); ?>

        <div id="page-content" class="container">
            <div class="scrollbar">
                <div id="directory-list-header">
                    <div class="row">
                        <div class="col-md-7 col-sm-6 col-xs-10">Arquivo</div>
                        <div class="col-md-2 col-sm-2 col-xs-2 text-right">Tamanho</div>
                        <div class="col-md-3 col-sm-4 hidden-xs text-right">Última modificação</div>
                    </div>
                </div>
    
                <ul id="directory-listing" class="nav nav-pills nav-stacked">
    
                </ul>
            </div>
            <div class="overlay" style="/* display:none */"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        </div>

<?php file_exists($lister->getThemePath(true) . '/footer.php') ? include($lister->getThemePath(true) . '/footer.php') : include($lister->getThemePath(true) . "/default_footer.php"); ?>

        <div id="file-info-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">{{modal_header}}</h4>
                    </div>

                    <div class="modal-body">

                        <table id="file-info" class="table table-bordered">
                            <tbody>

                                <tr>
                                    <td class="table-title">MD5</td>
                                    <td class="md5-hash">{{md5_sum}}</td>
                                </tr>

                                <tr>
                                    <td class="table-title">SHA1</td>
                                    <td class="sha1-hash">{{sha1_sum}}</td>
                                </tr>

                                <tr>
                                    <td class="table-title">SHA256</td>
                                    <td class="sha256-hash">{{sha256_sum}}</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </div>
        <script>var $base = '<?=BASE?>'</script>
        <script type="text/javascript" src="<?php echo THEMEPATH; ?>/js/script.js"></script>

    </body>

</html>
