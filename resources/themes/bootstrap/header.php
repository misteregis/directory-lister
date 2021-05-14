        <div id="page-navbar" class="navbar navbar-default navbar-fixed-top">
            <div class="container">
        
                <p class="navbar-text">
                    <a href="#home">Home</a>
                </p>
        
                <div class="navbar-right">
        
                    <ul class="nav navbar-nav">
                        <li id="page-top-nav">
                            <a id="page-top-link" href="javascript:void(0)">
                                <i class="fa fa-arrow-circle-up fa-lg"></i>
                            </a>
                        </li>
                        <?php if ($lister->isZipEnabled()) { ?><li>
                            <a id="download-dir" href="javascript:void(0)" title="Baixar este diretório">
                                <i class="fa fa-download fa-lg"></i>
                            </a>
                        </li><?php } echo "\r\n";?>
                    </ul>
        
                </div>
        
            </div>
        </div>