<?php 
namespace app\release;

use app\release\model\ReleaseInfo;
use app\release\model\Variant;

class ProductDownloadButton
{
    private $releaseInfoLeadingEdge;
    private $releaseInfoLongTermSupport;
    private $variant;
    private $productName;
    
    public function __construct(string $productName)
    {
        $releaseInfoLeadingEdge = ReleaseInfoRepository::getLatestLeadingEdge($productName);
        $releaseInfoLongTermSupport = ReleaseInfoRepository::getLatestLongTermSupport($productName);
        
        $this->releaseInfoLeadingEdge = $releaseInfoLeadingEdge;
        $this->releaseInfoLongTermSupport = $releaseInfoLongTermSupport;
        $this->productName = $productName;
        
        if ($releaseInfoLeadingEdge == null) {
            $releaseInfoLeadingEdge = $releaseInfoLongTermSupport;
        }
        
        if ($releaseInfoLeadingEdge != null) {
            $this->variant = $releaseInfoLeadingEdge->getMostMatchingVariantForCurrentRequest($productName);
        }
    }
    
    public function render()
    {
        if ($this->releaseInfoLeadingEdge == null && $this->releaseInfoLongTermSupport == null) {
            echo 'no release info available';
            return;
        }
        
        $variant = $this->variant;
        $collapseId = 'collapse-' . uniqid();
        
        $showLtsColumn = $this->releaseInfoLongTermSupport != null;

        $showLeadingEdgeColumn = true;
        if ($this->releaseInfoLeadingEdge != null) {
            if ($this->releaseInfoLongTermSupport != null) {
                if ($this->releaseInfoLeadingEdge->getVersion()->getVersionNumber() == $this->releaseInfoLongTermSupport->getVersion()->getVersionNumber()) {
                    $showLeadingEdgeColumn = false;
                }
            }
        } else {
            $showLeadingEdgeColumn = false;
        }
        
        $productSupportVersion = 'Leading Edge';
        if ($this->releaseInfoLeadingEdge != null && $this->releaseInfoLongTermSupport != null) {
            $productSupportVersion = $this->releaseInfoLeadingEdge->getVersion()->getVersionNumber() == $this->releaseInfoLongTermSupport->getVersion()->getVersionNumber() ? 'Long Term Support' : 'Leading Edge';
        }
        
        ?>

<style>
.row-centered {
    text-align:center;
}

.col-centered {
    display:inline-block;
    float:none;
    /* reset the text-align */
    text-align:left;
    /* inline-block space fix */
    margin: 0px 10px;
    vertical-align: top;
}
</style>
        
    	<div class="text-center">
        <div class="btn-group">
        
        	<?php if ($variant != null) { ?>
    		<a class="btn btn-success btn-lg btn-download" style="height:80px;" href="<?= ($this->productName == Variant::PRODUCT_NAME_ENGINE) ? $variant->getDownloadUrl() : $variant->getDownloadUrlViaInstallation() ?>">
    			Download Axon.ivy <b><?= $variant->getProductName() ?></b>
    			<span style="font-size:13px;margin-top:10px;display:block;">
    				<?= $productSupportVersion ?> <?= $variant->getVersion()->getBugfixVersion() ?> / <?= $variant->getType() ?> <?= $variant->getArchitecture() ?>
    			</span>
    		</a>
    		<?php } ?>
    		
    		<a class="btn btn-success btn-lg dropdown-toggle" style="height:80px;padding-top:25px;" role="button" data-toggle="collapse" href="#<?= $collapseId ?>" >
   				<span class="caret"></span>
  			</a>
    	</div>
        <p><a data-toggle="collapse" href="#<?= $collapseId ?>" >
   				Other versions/platforms<span class="caret"></span></a></p>
    	</div>
        
		<div id="<?= $collapseId ?>" class="panel-collapse collapse">
		    <div class="panel-body" style="padding-top: 0">
		   		<div class="row  row-centered">
		   			<div class="col-centered" >
		   				<?php 
		   				if ($showLeadingEdgeColumn) {
		   				   (new ProductDownloadButtonVersionColumn('Leading Edge','LeadingEdge', $this->productName, $this->releaseInfoLeadingEdge))->render();
		   				}
		   				?>
		   			</div>
		   		
		   			<div class="col-centered">
		   				<?php 
		   				if ($showLtsColumn) {
		   				    (new ProductDownloadButtonVersionColumn('Long Term Support','LongTermSupport', $this->productName, $this->releaseInfoLongTermSupport))->render();
		   				}
		   				?>
		   			</div>
		   		</div>
   	        </div>
   	    </div>
        
        <?php
    }
}

class ProductDownloadButtonVersionColumn
{
    private $title;
    private $key;
    private $releaseInfo;
    private $productName;
    
    public function __construct(string $title, string $key, string $productName, ReleaseInfo $releaseInfo)
    {
        $this->title = $title;
        $this->key = $key;
        $this->productName = $productName;
        $this->releaseInfo = $releaseInfo;
    }
    
    public function render()
    {
        $title = $this->title;
        $key = $this->key;
        $releaseInfo = $this->releaseInfo;
        ?>
        
        <a href="#<?=$key?>"><h3 style="margin-top:0px;"><small><?= $title ?></small></h3></a>
		<h4 style="margin-top:0px;"><?= $releaseInfo->getVersion()->getBugfixVersion() ?></h4>
            		<?php
                    foreach ($releaseInfo->getVariants() as $variant) {
                        if ($variant->getProductName() == $this->productName) {
                            $downloadUrl = ($this->productName == Variant::PRODUCT_NAME_ENGINE) ? $variant->getDownloadUrl() : $variant->getDownloadUrlViaInstallation();
                            $type = $variant->getType();
                            $architecture = $variant->getArchitecture();
                            echo '<span class="glyphicon glyphicon-download"></span> <a class="download-link" href="'.$downloadUrl.'">' . $type . ' ' . $architecture . '</a><br />';
                        }
                    }
                    
                    if ($this->productName == Variant::PRODUCT_NAME_ENGINE && $releaseInfo->hasHotfix()) {
                        echo '<br />';
                        $doc = $releaseInfo->getHotfixFile();
                        if ($doc != null) {
                            echo '<span class="glyphicon glyphicon-download"></span> ' . '<a href="'.$doc->getUrl().'">'.$doc->getShortName().'</a><br />';
                        }
                        
                        $doc = $releaseInfo->getHotfixHowtoDocument();
                        if ($doc != null) {
                            echo '<span class="glyphicon glyphicon-file"></span> ' . '<a href="'.$doc->getUrl().'">'.$doc->getName().'</a><br />';
                        }
                    }
                    
                    $docs = $releaseInfo->getDocuments($this->productName);
                    echo '<br />';
                    if (!empty($docs)) {
                        foreach ($docs as $doc) {
                            echo '<span class="glyphicon glyphicon-file"></span> ' . '<a href="'.$doc->getUrl().'">'.$doc->getName().'</a><br />';
                        }
                    }
                    
                    echo '<a href="'.$releaseInfo->getDocumentationOverviewUrl().'">more ..</a>';
    }
}
