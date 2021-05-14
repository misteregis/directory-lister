<div id="page-navbar" class="navbar navbar-default navbar-fixed-top">
    <div class="container">

        <?php $breadcrumbs = $lister->listBreadcrumbs(); ?>

        <p class="navbar-text">
            <?php foreach($breadcrumbs as $breadcrumb): ?>
                <?php if ($breadcrumb != end($breadcrumbs)): ?>
                    <a href="<?php echo $breadcrumb['link']; ?>"><?php echo $breadcrumb['text']; ?></a>
                    <span class="divider">/</span>
                <?php else: ?>
                    <?php echo $breadcrumb['text']; ?>
                <?php endif; ?>
            <?php endforeach; ?>
        </p>

        <div class="navbar-right">

            <ul id="page-top-nav" class="nav navbar-nav">
                <li>
                    <a href="javascript:void(0)" id="page-top-link">
                        <i class="fa fa-arrow-circle-up fa-lg"></i>
                    </a>
                </li>
            </ul>

        </div>

    </div>
</div>