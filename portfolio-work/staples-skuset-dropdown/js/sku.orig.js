/*
@File Name: SKU.js
@Description: 
@Author: 
Change Log
==========
Date					Purpose
----					-------
16 Oct 2012				Initial Draft
*/

( function(window, document, $, undefined) {
    'use strict';
    var STAPLES = ( function(STAPLES) {

		STAPLES.SKU = ( function() {
			// global variable for SKU
			var myName,
				serverName,
				xmlSkuAsString,
				xmlSkuStrAsObj,
				xmlSkuSetString,
				xmlSkuSidebarString,
				carouselXSL,
				skuXsltProcessor,
				skuRRXsltProcessor,
				XSLTSkuCompiled,
				XSLTSkuProc,
				XSLTSkuRRProc,
				collectionXsltProcessor,
				skuXslLoaded = false,
				carouselXslLoaded = false,
				skuRightRailXslLoaded = false,
				tabUL,
				switchtabcount = 0,
				tabArray,
				hasChangeActionForSku = true,
				collAttrIdRefresh,
				skuidForRefresh = '',
				ivGlobal,
				fileName = "sku.js",
				alertQVSSOnload = true,
				alertSKUClick = true,
				hashvalue = '',
				map = new Array(),
				ivTemp = null,
				isSecure = (location.protocol === 'https:');

			// SKU methods
			function genInstance(){
				var curDateTime,
					curTime;
				curDateTime = new Date();
				curTime = 'ZoomMX' + curDateTime.getHours()+ curDateTime.getMinutes() + curDateTime.getSeconds();
				return curTime;
			}

			//autoResize functions
			function resizeStage(inWidth, inHeight){
				var elementId = myName,
					isSafari,
					elm = null,
					checkElm = false;
				isSafari = ((navigator.appName==='Safari') || (navigator.userAgent.toLowerCase().indexOf('safari')>-1));
				if (!isSafari){
					elm = document.embeds[elementId];
				}
				if (elm){
					checkElm = true;
				}
				if (!isSafari && checkElm){
					elm.width = inWidth;
					elm.height= inHeight;
				}else {
					setWidth(elementId, inWidth);
					setHeight(elementId, inHeight);
				}
			}

			function getLayer(name){
				var elm;
				if (document.getElementById){
					elm = document.getElementById(name).style;
				}else if (document.all){
					elm = document.all[name].style;
				}else if (document.layers){
					elm = document[name];
				}
				return elm;
			}

			function setWidth(layer,w){
				$("#"+layer).width(w);
			}

			function setHeight(layer,h){
				$("#"+layer).height(h);
			}

			function setImage(image, id, thumbnail){    
				if (!id){
					id = "s7flyout";
				}
				if (document.embeds && document.embeds[id]){
					document.embeds[id].setImage(image);
				}else {
					document.getElementById(id).setImage(image);
				}
				$(".thumbs img").removeClass("selectedThumb");
				$(thumbnail).addClass("selectedThumb");
			} 

			function collectionSwatchClick(attrValId,skuSetId,colFlag){
				var swatchHeaderXSL,
					collectionChat,
					expDel,
					divId,
					chatText,
					$chatContainer;
			
				swatchHeaderXSL = $('h5#stepone').text();
				collectionChat = $(".printChat #chatholder").html();

				xmlSkuAsString = loadXMLStringForSkuset();
				
				expDel = $("#stage .checkmarks li.expectdel").html();
				//Pull HTML DOM for Product Catalog (with children Product Set Elements) and load into an XML DOM
				xmlSkuStrAsObj = loadSkuXMLString(xmlSkuAsString);
				applyTransformationCollection(xmlSkuStrAsObj,attrValId,expDel,skuSetId,colFlag);
				divId = "#"+attrValId+"_"+attrValId;
				$(divId).parent().addClass("selected");
				$chatContainer = $(".printChat #chatholder");
				if($("#chatcontent")[0]!==null){
					chatText = $("#chatcontent").html();
					$chatContainer.html(chatText);
				}else {
					$chatContainer.html(collectionChat);
				}
				$('h5#stepone').html(swatchHeaderXSL);
			}

			function loadSkuXMLString(txt){
				if(typeof(txt)==='undefined'){
					txt = loadXMLStringForSkuset();
				}
				return STAPLES.Utilities.parseXMLString(txt);
			}

			function loadXMLStringForSkuset(){
				var xmldata;
				if( typeof(quickView)!= 'undefined' && typeof(quickView)!= undefined && quickView===true){
			        // The XML embedded within the HTML mark-up should only be read on page load as a starting point.
			        //Checking for ie which does not support '.html()' jquery method in 1.6
			        if(window.ActiveXObject){
			        	xmldata = document.getElementById('divOverlay').getElementsByTagName('xml')[0].innerHTML;
			        }else{
			        	xmldata = $("#divOverlay #skufilterbrowse").html();
			        }
			    }else if(window.ActiveXObject) {
			    	xmldata = document.getElementById("skufilterbrowse").innerHTML;
			    }else{
			    	xmldata = $("#skufilterbrowse").html();
			    }
				return xmldata;
			}

			function unencodeSkuHTMLFromResultDocument(htmlToEscape){
				var escpHtml;
				escpHtml = htmlToEscape.replace( /&lt;/g, "<");
				escpHtml = escpHtml.replace( /&gt;/g, ">");
				escpHtml = escpHtml.replace( /&amp;quot;/g, "\"");
				escpHtml = escpHtml.replace( /&amp;reg;/g, "&reg;");
				if(( navigator.userAgent.lastIndexOf('Chrome/') > 0) || ( navigator.userAgent.lastIndexOf('Safari/') > 0) ){
					escpHtml = escpHtml.replace(/%24thb%24/g, "$thb$");
					escpHtml = escpHtml.replace(/%24splssku%24/g, "$splssku$");
					escpHtml = escpHtml.replace(/%24splsqvo%24/g, "$splsqvo$");
				}
				return escpHtml;
			}

			/* This function applies the xsl transformation to the modified xml object and renders and HTML
			* section within the pre-defined DIV section of the page.*/

			function applyTransformationSku(xmlSkuObj,selectedSKU,pageName){
				var stageElement,
					scripts,
					resultSkuDocument,
					code = "",
					i = 0;
				
				if (window.ActiveXObject){
					//Do not load the XSL and Import the XSL into the Processor, after it has already been done
					if( skuXslLoaded === false ){
						// 01/11/2010 : Put this line back in if following line fails -> var XSLTCompiled = new ActiveXObject("Msxml2.XSLTemplate.3.0");
						//XSLTSkuCompiled = new ActiveXObject("MSXML2.XSLTemplate");
						XSLTSkuCompiled = new ActiveXObject("Msxml2.XSLTemplate.3.0");
						XSLTSkuCompiled.stylesheet = xmlSkuSetString.documentElement;
						XSLTSkuProc = XSLTSkuCompiled.createProcessor();
						skuXslLoaded = true;
					}
					XSLTSkuProc.input = xmlSkuObj;
					XSLTSkuProc.addParameter("selectedSKU", selectedSKU);
					XSLTSkuProc.addParameter("pageName", pageName);//variable pageName is to identify whether the call is from sku/skuset or quickview
					XSLTSkuProc.addParameter("exitURL","http://"+serverName+"/product_");
				
					//Added by Cognizant to fix an issue with Add to cart button.
					XSLTSkuProc.addParameter("AddToCart",propertyValues.addtocart);
					XSLTSkuProc.addParameter("Qty",propertyValues.Qty);
		
					if(isKiosk){
						XSLTSkuProc.addParameter("iskiosk","1");
					}
					XSLTSkuProc.transform();
					stageElement = $("#stage");
					if(pageName === 'quickview'){
						stageElement = $("#divOverlay #stage"); 
					}
					stageElement.empty();
					stageElement.html("<span style= \"display:none\">none</span>"+unencodeSkuHTMLFromResultDocument(XSLTSkuProc.output));
					//all this , just to execute scripts embedded in the XSL...
					scripts = $(stageElement).find("script");
					for (i = 0; i < scripts.length; i++) {
						code = "";
						if (scripts[i].innerHTML) {
							code = scripts[i].innerHTML;
						}
						if (code){
							window.execScript(code,"JavaScript");
						}
					}
				}
				// code for Mozilla, Firefox, Opera, etc.
				else if (document.implementation && document.implementation.createDocument){
					//Do not load the XSL and Import the XSL into the Processor, after it has already been done
					if(skuXslLoaded === false){
						skuXsltProcessor = new XSLTProcessor();
						skuXsltProcessor.importStylesheet(xmlSkuSetString);
						skuXslLoaded = true;
					}
					
					skuXsltProcessor.setParameter(null, "selectedSKU", selectedSKU);
					skuXsltProcessor.setParameter(null, "pageName", pageName);//variable pageName is to identify whether the call is from sku/skuset or quickview
					skuXsltProcessor.setParameter(null, "exitURL","http://"+serverName+"/product_");
			
					//Added by Cognizant to fix an issue with Add to cart button.
					skuXsltProcessor.setParameter(null,"AddToCart",propertyValues.addtocart);
					skuXsltProcessor.setParameter(null,"Qty",propertyValues.Qty);
					
					if(isKiosk){
						skuXsltProcessor.setParameter(null,"iskiosk","1");
					}
					resultSkuDocument = skuXsltProcessor.transformToFragment(xmlSkuObj,document);
					stageElement = $("#stage");
					if(pageName === 'quickview'){
					  stageElement = $("#divOverlay #stage");
					}
					stageElement.empty();                
					stageElement.html(resultSkuDocument);
					stageElement.html(unencodeSkuHTMLFromResultDocument(stageElement.html()));
					
					//all this , just to execute scripts embedded in the XSL...
					scripts = $(stageElement).find("script");
					for (i = 0; i < scripts.length; i++) {
						code = "";
						if (scripts[i].innerHTML) {
							code = scripts[i].innerHTML;
						}
						if (code){
							eval(code);
						}
					}
				}
				applyTransformationRightRail(xmlSkuObj,selectedSKU,pageName);
				if( typeof(quickView)!== 'undefined' && typeof(quickView)!== undefined && quickView===true){
					$('.quickViewOverlay .copyBullets ul li').jTruncate({
						length: 100,
						minTrail: 20,
						moreText: "...",
						lessText: "hide"
					});
				}
				else {
					$('.skuWrapper .copyBullets ul li').jTruncate({
						length: 100,
						minTrail: 20,
						moreText: "...",
						lessText: "hide"
					});
				}
				hideCheckmarks();
			}

			/*
			 * This function applies the xsl transformation to the modified xml object and renders and HTML
			 * section within the pre-defined DIV section of the page. This is a duplicate of applyTransformationSku
			 * with pretty much the same code except for the xsl and the way the div container is modified.
			 * TODO: If possible merge these
			 */
		
			function applyTransformationRightRail(xmlSkuObj,selectedSKU,pageName){
				var skuRightRailXsl,
					resultSkuDocument,
					stageElement,
					i = 0,
					code = '',
					scripts;
				if (window.ActiveXObject){
				   //Do not load the XSL and Import the XSL into the Processor, after it has already been done
				   if( skuRightRailXslLoaded == false){
					   	// 01/11/2010 : Put this line back in if following line fails -> var XSLTCompiled = new ActiveXObject("Msxml2.XSLTemplate.3.0");
						XSLTSkuRRCompiled = new ActiveXObject("MSXML2.XSLTemplate");
						//test code end
						XSLTSkuRRCompiled.stylesheet = xmlSkuSidebarString.documentElement;
						// create XSL-processor
						XSLTSkuRRProc = XSLTSkuRRCompiled.createProcessor();
						skuRightRailXslLoaded = true;
					}
					XSLTSkuRRProc.input = xmlSkuObj;
					XSLTSkuRRProc.addParameter("selectedSKU", selectedSKU);
					XSLTSkuRRProc.addParameter("pageName", pageName);//variable pageName is to identify whether the call is from sku/skuset or quickview
					XSLTSkuRRProc.addParameter("exitURL","http://"+serverName+"/product_");
					if(isKiosk){
						XSLTSkuRRProc.addParameter("iskiosk","1");
					}
					XSLTSkuRRProc.transform();
					stageElement = $("#stage2");
					if(pageName == 'quickview'){
						stageElement = $("#divOverlay #stage2"); 
					}
					//Commenting out as part of sku page redesign and changing to append instead of a replace
					stageElement.empty();
					stageElement.html("<span style= \"display:none\">none</span>"+unencodeSkuHTMLFromResultDocument(XSLTSkuRRProc.output));
					stageElement.html(unencodeSkuHTMLFromResultDocument(stageElement.html()));
					//all this , just to execute scripts embedded in the XSL...
					scripts = stageElement.find("script");
					for (i = 0; i < scripts.length; i++) {
						code = "";
						if (scripts[i].innerHTML) {
							code = scripts[i].innerHTML;
						}
						if (code)
							window.execScript(code,"JavaScript");
					}
				}
				// code for Mozilla, Firefox, Opera, etc.
				else if (document.implementation && document.implementation.createDocument){
					//Do not load the XSL and Import the XSL into the Processor, after it has already been done
					if( skuRightRailXslLoaded == false){
					   skuRRXsltProcessor=new XSLTProcessor();
					   skuRRXsltProcessor.importStylesheet(xmlSkuSidebarString);
					   skuRightRailXslLoaded = true;
					}
					skuRRXsltProcessor.setParameter(null, "selectedSKU", selectedSKU);
					skuRRXsltProcessor.setParameter(null, "pageName", pageName);//variable pageName is to identify whether the call is from sku/skuset or quickview
					skuRRXsltProcessor.setParameter(null, "exitURL","http://"+serverName+"/product_");
					if(isKiosk){
						skuRRXsltProcessor.setParameter(null,"iskiosk","1");
					}
					resultSkuDocument = skuRRXsltProcessor.transformToFragment(xmlSkuObj,document);
					stageElement = $("#stage2");
					if(pageName == 'quickview'){
						stageElement = $("#divOverlay #stage2");
					}
					//Commenting out as part of sku page redesign and changing to append instead of a replace
					stageElement.empty();                
					stageElement.html(resultSkuDocument);
					stageElement.html(unencodeSkuHTMLFromResultDocument(stageElement.html()));
					//all this , just to execute scripts embedded in the XSL...
					scripts = stageElement.find("script");
					for (i = 0; i < scripts.length; i++) {
						code = "";
						if (scripts[i].innerHTML) {
							code = scripts[i].innerHTML;
						}

						if (code)
							eval(code);
					}
				}
			}

			function removeTab(liID) {
				$('#' + liID).remove();
			}

			function addTab(tabName,tabText,sidebarID,sku) {
				var liID,
					contentID;
				if (!tabUL) {
					if(quickView){
						tabUL=$('#divOverlay #tabUL');
							}else{
						tabUL=$('#tabUL');
					}
				}
				liID = tabName + '_tab';
				contentID = tabName + '_content';
				tabArray[liID] = contentID + ',' + sidebarID;
				tabUL.append(   '<li id="' + liID + '">' + 
						'<a href="#' + contentID + '" onclick="switchtab(this,\'' + tabText + '\',\'' + sku + '\'); return false;"><span>&nbsp;<\/span>' + tabText  + '<\/a>' + 
					'<\/li>'
				);
			}

			function addPersonalizedToCart(url,formId) {
				var formName = $('#' + formId)[0],
					params = '',
					suffix = '',
					elementName = '',
					i,
					str;
				for(i = 0; i < formName.elements.length; i++) {
					elementName = formName.elements[i].name;
					if ((elementName.indexOf('quantity_') > -1) ||
						(elementName.indexOf('partNumber_') > -1) ||
						(elementName.indexOf('catentryId_') > -1) ||
						(elementName.indexOf('cmArea_') > -1)) {
						
						suffix = elementName.substring((elementName.lastIndexOf('_') + 1), elementName.length);
						str = "document." + formId + ".quantity_" + suffix + ".value";
		
						try{
							if ( formName.elements[i].value != '' && eval(str) != ''){
								params  += '&'
								+ elementName
								+ '='
								+ formName.elements[i].value;
							}
						} catch(err){
							//do nothing
						}
					}
				}
		
				if(params != '') {
					window.location.href = url + params;
				}
			}

			function remotelyswitchtab(liID,cmValue,cmName) {
				switchtab($('#' + liID + ' > a:first')[0],cmValue,cmName);
			}

			//dhtml tab switching for sku page
			function switchtab(callinglink,cmValue,cmName) {
				var div = "",
					thisTab,
					thisTabData,
					elementHtml;

				if($('#divOverlay').length){
					div = $("#divOverlay");
				}else {
					div = $(document);
				}
				if (propertyValues.analyticsSwitch == "ON" && switchtabcount > 0) {
					//Call omniture function for tracking 'Product Tabs'
					s_prodTab(cmValue);
				}   
				tabUL=div.find("#tabUL");
				switchtabcount++;
				thisTab = callinglink.parentNode;
				thisTabData = tabArray[thisTab.id].split(',');

				//hide stuff
				tabUL.find('li').removeClass('tabactive');
				div.find("div[id*='_content']").addClass('hide');
				div.find("div[id^='custom_'][id$='content']").addClass('hide');
				div.find("div.g02").addClass('hide');
				div.find("div.g01").addClass('hide');

				//on demand loader
				try {
							elementHtml = $("#" + thisTabData[0] + '_ondemand');
							if (elementHtml.html() != ondemandContentArray[thisTabData[0] + '_ondemand']) {
								elementHtml.html(ondemandContentArray[thisTabData[0] + '_ondemand']);
					}
				} catch (e) {
							// do nothing
				}   

				//show stuff
				div.find('#'+thisTab.id).addClass('tabactive');
				showme(thisTabData[0]);
				if (thisTabData[1] =='true') {
					if (typeof(quickView)=='undefined' || typeof(quickView)== undefined || quickView!==true){
						showme('reqrecsidebar');    
					}
				} else if (thisTabData[1] != '') {
					showme(thisTabData[1]);             
				}
			}

			function setupImages() {
				var imgArrayMax;

				imgArrayMax = imgArray.length;
				imgArrayUbound = imgArrayMax-1;
				counterMessage = counterMessage.replace(/\{1\}/,imgArrayMax);
				if (imgArrayUbound >=1) {
					preLoad(1);
				}
				if (imgArrayUbound >=2) {
					preLoad(imgArrayUbound);    
				}
			}

			function preLoad(index) {
				if (! document.getElementById('productimage-' + index)) {
					var preloaderimg = document.getElementById('productimage-0').cloneNode(false);
					preloaderimg.src = imgPath.replace(/\{1\}/,imgArray[index]);
					preloaderimg.id = 'productimage-' + index;
					preloaderimg.className = 'hide';
					document.getElementById('productimagelink').appendChild(preloaderimg);
				}
			}
			
			function displayPrice(idObject){
				$(idObject).parents('.pricenew').css('zIndex',8010); 
				$(idObject).parents(".theprice").siblings(".mathflyout").removeClass('hide');
			}

			function hidePrice(idObject){
				$(idObject).parents('.pricenew').css('zIndex',0);
				$(idObject).parents(".theprice").siblings(".mathflyout").addClass('hide');
			}

			function previousImage() {
				currentIndex--;
				if (currentIndex < 0) {
					currentIndex = imgArrayUbound;
				}
				updateAndPreload(currentIndex);
			}

			function nextImage() {
				currentIndex++;
				if (currentIndex > imgArrayUbound) {
					currentIndex = 0;
				}
				updateAndPreload(currentIndex);
			}

			function updateAndPreload(currentIndex) {
				$('#productimage img').addClass('hide');
				if (imgArrayUbound > 0) {
					if (currentIndex - 1 < 0) {
						preLoad(imgArrayUbound);    
					} else {
						preLoad(currentIndex - 1);  
					}
					if (currentIndex + 1 > imgArrayUbound) {
						preLoad(0); 
					} else {
						preLoad(currentIndex + 1);  
					}
				}
				$('#productimage-' + currentIndex).removeClass('hide');
				$('#imagecounter').html(counterMessage.replace(/\{0\}/,currentIndex+1));
			}

			//Description       :   Function to populate tab array to enable tab switching for skuinfo2inc.
			function populateTabArray(){
				var tabData,
					tabSplit,
					i,
					individualTab;

				tabData = $("#tabData").val();
				tabSplit = tabData.split('|');
				for(i=0; i< tabSplit.length ; i=i+1){
					individualTab = tabSplit[i].split('/');
					tabArray[individualTab[0]] = individualTab[1];
				}
				tabUL=$('#divOverlay #tabUL');  
			}

			//  Description         :   This function redirects to class page compare view onclick of 
			//  Input Parameters    :   catentryID
			//                          scene7 image token as global var.
			function compareWithSimilar(catentryId, classUrl, aLink){
				var imgToken,
					imgSrc;
				if(aLink !== undefined){
					imgSrc = aLink.parents(".skuinfo1").find("div.pimg2 img.std").attr("src");
					imgToken = imgSrc.substring((1+imgSrc.lastIndexOf("/")),imgSrc.lastIndexOf("_sc7"));
				}else if(typeof(imgcomp) !== 'undefined'){
					imgToken = imgcomp;
				}
				if (classUrl !== undefined){
					window.location.href=classUrl+'#viewDetails=\'compareView\'&compareList=['+'\''+catentryId+'-'+imgToken+'\''+']';
				}
			}

			//Description       :   This updates the delivery msgs
			//Input Parameters  :   iv : JSON object containing IV details
			//                      curPartNum: partnumber of the current product to be shown 
			//                      quickView: to indicate if invoked from quick view
			//                      onLoad: boolean value.true if called onload.
			function skuQuickViewLoadEvent(iv, curPartNum,quickView,onLoad){
				var t_qvssonload_start =  (new Date()).getTime(),
					t_qvssonload_end,
					eqvsstime;
		
				if(!quickView){
					if(ivTemp==null){
						ivTemp = iv;
					}else{
						iv = ivTemp;
					}
				}
				if(typeof(iv) != 'undefined'){
					var matchFound = false,
						show = true,
						one,
						leadTimeDesc='',
						mtSku;

					if (iv != undefined && typeof(curPartNum) != 'undefined'){
						matchFound = false;
						show = true;
						for (one in iv){
							if(one == curPartNum)matchFound=true;
						}
						if(matchFound){
							leadTimeDesc='';
							if(eval('iv[\''+curPartNum+'\'].iv') == '1'){
								if(quickView){
									$('#divOverlay #stockMessage').addClass("hide");
									$('#divOverlay .cartActions').removeClass("hide");
									$('#divOverlay #spic').removeClass("hide");
									$('#divOverlay #availableMsg').removeClass("hide");
								}else{
									$('#stockMessage').addClass("hide");
									$('.cartActions').removeClass("hide");
									$('#spic').removeClass("hide");
								}
							} else {
								if(quickView){
									$('#divOverlay #stockMessage').removeClass("hide");
									$('#divOverlay .cartActions').addClass("hide");
									$('#divOverlay #spic').addClass("hide");
									$('#divOverlay #availableMsg').removeClass("hide");
								}else{
									$('#stockMessage').removeClass("hide");
									$('.cartActions').addClass("hide");
									$('#spic').addClass("hide");
								}
								$('#spicmath').addClass("hide");
								if(quickView){
									$('#divOverlay #spic').addClass("hide");
								}else{
									$('#spic').addClass("hide");
								}
								show = false;
							}
							leadTimeDesc=eval('iv[\''+curPartNum+'\'].leadTimeDesc');
						}
						else if(typeof(skuSetPNum) != 'undefined' && skuSetPNum == curPartNum){
							leadTimeDesc=iv.skuSetLTDesc;
						}
						if(show){
							if(quickView){
								if(leadTimeDesc!= undefined && leadTimeDesc.substring(0,1)!=" ")
									{
									leadTimeDesc = " "+leadTimeDesc
									}
								$("#divOverlay #stage .checkmarks li.expectdel #ivOutput").html(leadTimeDesc);
								$("#divOverlay #stage .checkmarks li.expectdel").removeClass("hide");
								$("#divOverlay #stage .checkmarks li.instockonline").removeClass("hide");
							}else{
								$("#stage .checkmarks li.expectdel #ivOutput").html(leadTimeDesc);
								$("#stage .checkmarks li.expectdel").removeClass("hide");
								$("#stage .checkmarks li.instockonline").removeClass("hide");
							}
						}
					}
					if(quickView){
						//hide Q/A, sharethis, review link 
						$(".quickview").find("#questionanswersnippet").addClass("hide");
						$(".quickview").find("#noquestionanswersnippet").addClass("hide");
						$(".quickview").find(".stbutton").addClass("hide");
						//hide review link
						$(".quickview").find(".rvlink").addClass("hide");
						//show productdetails/specification/review tabs. All other tabs will be hidden
						$(".quickview").find(".qw").removeClass("hide");
						//show fulldetails button
						$(".quickview").find("#fulldetails").removeClass("hide");           
						$(".quickview").find(".pr-snapshot-write-review").addClass("hide");
				
					}else{
						$("ul#tabUL li").removeClass("hide");
						mtSku = document.getElementById("matchToolSku");
						if(mtSku !== undefined && mtSku.value == 'false'){
							//if not matchtoolsku show compare link
							$("#tabcontainer").find(".cmp").removeClass("hide");
						}
						mtSku = $("#matchToolSku");
						if(mtSku !== undefined && mtSku.val() == 'false'){
							//if not matchtoolsku show compare link
							$("#tabcontainer").find(".cmp").removeClass("hide");
						}
					}
				}
				if(onLoad){
					iv.tstamp= new Date();
					//store it in global scope
					ivGlobal=iv;
					if(!quickView){
						refreshSkuHash();
					}
				}else{
					//execute the js function calls embedded in the ajax response
					if(!quickView){
						$("#tabcontainer script").each(function(){eval($(this).text())});
					}
				}
		
				t_qvssonload_end = new Date().getTime();   
				if( alertQVSSOnload){
					eqvsstime=t_qvssonload_end-t_qvssonload_start;            
					$("#debug").append('<br /> PerfQVSSOnload =' + eqvsstime);
				}
			}

			//Description       :   This method fetches the values from hash parameter to maintain the state of the page
			//                      This method will be called on loading the skuset/collection page
			function refreshSkuHash(){
				hashvalue=location.hash;
				if(hashvalue!=undefined && hashvalue.length>1 && hashvalue.indexOf("=") != -1){    
					var jsonStg = "",
						jsonHash = "";
		
					jsonStg = '"'+hashvalue.substring(1).replace(/&/g,',"');  
					jsonStg = jsonStg.replace(/=/g,'":'); 
					jsonHash = $.parseJSON(jsonStg);
					if(jsonHash.id !== undefined && trim(jsonHash.id)!=''){
						skuidForRefresh=jsonHash.id;
					}
					if(jsonHash.collAttrId!=undefined && trim(jsonHash.collAttrId) !=''){
						collAttrIdRefresh=jsonHash.collAttrId;
					}
					//Added this to fix the issue of title change in IE browser
					if (window.ActiveXObject){
						if(getIEVersion() < 9){
						  updateTitle(); 
						}
					}
					if(skuidForRefresh.indexOf("swatch")>=0){
						setTimeout("SWATCH.swatchClick(skuidForRefresh,'hashChange');",1000);
					}else if(skuidForRefresh.indexOf("dropdown")>=0){
						setTimeout("SWATCH.selectDropdown('hashChange',skuidForRefresh);",1000);
					}else{
						skuidForRefresh = getSkuSetIdFromXml();
						setTimeout("SWATCH.collectionSwatchClick(collAttrIdRefresh,skuidForRefresh,'0','hashChange');",1000);
						if (window.ActiveXObject){
							if(getIEVersion() >= 9){
								if(document.title.indexOf("#collAttrId")!=-1){
									document.title = document.title.split("#collAttrId")[0];
								}
							}
						}
					}
				}
			}

			//Description       :   This method is to fetch the skuset id from the xml written to the client
			function getSkuSetIdFromXml(){
				var skuid,
					version,
					curProdNode;
		
				xmlSkuAsString = loadXMLStringForSkuset();
				xmlSkuStrAsObj = loadSkuXMLString(xmlSkuAsString);
				if (window.ActiveXObject){ 
					version = getIEVersion();
					if(version >= 9){
						//code for IE 9
						var productNodeArray,
							nodeCnt;
						productNodeArray = xmlSkuStrAsObj.getElementsByTagName("product");
						for( nodeCnt = 0; nodeCnt < productNodeArray.length; nodeCnt++ ){
							tempProdNode = productNodeArray[ nodeCnt ];
							if(tempProdNode.getAttribute("type") == 'skuset'){
								curProdNode = tempProdNode;
							}
						}
					}else{
						curProdNode=xmlSkuStrAsObj.selectSingleNode('//productcatalog/product[@type="skuset"]');
					}
				}
				// code for Mozilla, Firefox, Opera, etc.
				else{
					curProdNode=selectSingleNodeForNonIE(xmlSkuStrAsObj,'//productcatalog/product[@type="skuset"]');
				}
				skuid = curProdNode.getAttribute("id");
				return skuid;
			}

			//Description       :   Add/Modify the hash parameter for skuset page
			//Input Parameters  :   skuId,methodFrom
			function displayHash(skuId,methodFrom){
				var urlAry=new Array();
		
				if(methodFrom !== "hashChange"){
					hasChangeActionForSku = false;
				}
				if(skuId !== undefined && trim(skuId)!=''){
					urlAry[urlAry.length] = 'id=\''+skuId+'\'';
				}
				if(methodFrom !== "hashChange"){
					if(urlAry.length >0){
						document.location.hash='#'+urlAry.join('&');
					}
				}
				if (window.ActiveXObject){
					if(getIEVersion() >= 9){
						if(document.title.indexOf("#id")!=-1){
							document.title=document.title.split("#id")[0];
						}
					}
				}
			}

			//Description       :   Add/Modify the hash parameter for collection page
			//Input Parameters  :   collAttrId,methodFrom
			function displayHashForCollection(collAttrId,methodFrom){
				var urlAry=new Array();

				if(methodFrom !== "hashChange"){
					hasChangeActionForSku = false;
				}
				if(collAttrId !== undefined && trim(collAttrId)!=''){
					urlAry[urlAry.length] = 'collAttrId=\''+collAttrId+'\'';
				}
				if(methodFrom !== "hashChange"){
					if(urlAry.length >0){
						document.location.hash='#'+urlAry.join('&');
					}
				}
				if (window.ActiveXObject){
					if(getIEVersion() >= 9){
						if(document.title.indexOf("#collAttrId")!=-1){
							document.title = document.title.split("#collAttrId")[0];
						}
					}
				}
			}

			//Description       :   This method is called when the hash parameter in the url gets changed
			function hashChangeFuncSku(){
				hashvalue=location.hash;
				if(hasChangeActionForSku){
					var skuid = '',
						collAttrId = '',
						jsonStg = '',
						jsonHash = '';

					if(hashvalue!=undefined && hashvalue.length>0){
						if(hashvalue.indexOf("=") != -1){
							jsonStg='"'+hashvalue.substring(1).replace(/&/g,',"');  
							jsonStg=jsonStg.replace(/=/g,'":'); 
							jsonHash = $.parseJSON(jsonStg);
							if(jsonHash.id !== undefined && trim(jsonHash.id)!=''){
								skuid=jsonHash.id;
							}
							if(jsonHash.collAttrId !== undefined && trim(jsonHash.collAttrId)!=''){
								collAttrId=jsonHash.collAttrId;
							}
							if(skuid.indexOf("swatch")>=0){
								SWATCH.swatchClick(skuid,"hashChange");
									}else if(skuid.indexOf("dropdown")>=0){
								SWATCH.selectDropdown("hashChange",skuid);
									}else{
								skuid = getSkuSetIdFromXml();
								SWATCH.collectionSwatchClick(collAttrId,skuid,'0',"hashChange");
							}
						}
					}else{
						if(pageId === 'skuskuset'){
							location.reload(true);
						}
					}
				}else{
					hasChangeActionForSku=true;
				}
			}

			//Description       :   This method is called when a sku is clicked from the carousel.
			//                      This method will refresh the swatch section and also the carousel section
			//Input Parameters  :   catEntryId,partNumber
			function getCollectionDetails(catEntryId,partNumber,colFlag){
				var swatchHeader = '',
					collectionChat = '',
					carouselPage,
					t_skuclick_start,
					methodName = 'getCollectionDetails',
					t_displayResult_start,
					taburl = '',
					randomNumForIE,
					json =  new Array(),
					greyoutSwatchArr = new Array(),
					catIdValue = '',
					attrValues = '',
					swatchAttrValues = '',
					selectswatch = '',
					i = 0,
					j = 0,
					count = 0,
					greyoutSwatchArrId = new Array(),
					xmlSkuStrAsObj,
					isBrandPage = false,//variable used to identify if its brand page
					divId = '',
					t_skuclick_end,
					attrvalueId,
					id,
					chatText = '',
					$chatContainer = '';
					
				if (typeof(quickView) == 'undefined' || quickView === undefined || quickView !== true){
					if($('#check') === null  && $('#shareThisDum') !== null && $('#shareThis') !== null){
						var innerDiv = "<div id='check'></div>";
						$('#shareThisDum').append(innerDiv);
						$("div#check").replaceWith($("div#shareThis"));
					}
				}
				swatchHeader = $('h5#stepone').text();
				collectionChat = $(".printChat #chatholder").html();
				if($('#collection_box').length){
					//gets active page for carousel and setting this value to refreshHeader method
					carouselPage = $('#collection_box .perpage ul').find('li.active').text();
					//convert value to an integer
					carouselPage = parseInt(carouselPage);
				}
				t_skuclick_start =  (new Date()).getTime();
				t_displayResult_start = new Date().getTime();
				//URL for ajax call for refreshing skuinfo2. ie product details portion.
				taburl = propertyValues.POST_DOMAIN+'skuinfotabs?partNumber='+partNumber+'&catentryId='+catEntryId+'&pageName=skuskuset&catalogId='+propertyValues.DEF_CATALOG_ID;
				taburl = 'http://' + serverName + taburl;
				randomNumForIE = Math.floor(Math.random()*1000001)
				if(typeof(quickView) == 'undefined' || quickView === undefined || quickView === false){
					try{
					$.ajax({
						url: taburl + "&r=" + randomNumForIE,
						type: 'GET',
						dataType: 'xml',
						timeout: 20000,
						error: function(a,b,c){
							debugMessages.push('CollectionPage: timeout or xml parse error on ' + collectionURL);
							$("#debug").append('<br />CollectionPage: timeout or xml parse error on ' + collectionURL); 
							if (propertyValues.ajaxLoggingSwitch =='ON'){
								var ajaxExecutionTime= (new Date().getTime())-t_displayResult_start;
								ajaxErrorURL=ajaxErrorURL+'&methodName='+methodName+'&fileName='+fileName+'&ajaxURL='+encodeURIComponent(taburl)+'&timeTaken='+ajaxExecutionTime+'&perfLogSwitch='+propertyValues.ajaxPerformanceSwitch;
								$.ajax({
									 url: ajaxErrorURL,
									 type: 'POST',
									 dataType: 'xml',
									 timeout: 20000,
									 success:function(){
											$("#pseudoblanket").removeClass('hide');
											$("#ajaxErrorMsg").removeClass('hide');
											$("dl.error dd").html(propertyValues.compAjaxErrorString+" <a href=\"javascript:getTheURLAndProceed();\">Try again</a>");
									 }
								})
							}
						},
						success: function(returnObj){
							var tempColl = "",
								sellpointColl = "",
								tabcontainerElement = $("#tabcontainer"),
								sideBarElement = $("#moduleRightRail"),
								$innerContent,
								$chatContent,
								$skuSideBarContent,
								$sellpoint,
								$sellCut,
								$sellonload,
								$replacesellonload;
											
							if(typeof(quickView)!= 'undefined' && quickView === true){
								tabcontainerElement = $("#divOverlay #tabcontainer");
							}
							//var $chatContainer = $("#stage div#chatcontent");
							$(returnObj).find('skuinfo').each(function(){
								$innerContent=$(this).find('info').text();
								$chatContent =$(this).find('chat').text();
								$skuSideBarContent =$(this).find('sidebar').text();
								if(typeof(quickView) == 'undefined' || typeof(quickView) === undefined || quickView !== true){
									tempColl = trim($chatContent).substring(trim($chatContent).indexOf('<script src'),trim($chatContent).indexOf('</p>'));
									$sellonload = $("#sellpoint").html();
									if($sellonload != null){
										$sellpoint =$(this).find('sellpoint').text();
										$sellCut = trim($sellpoint).substring(trim($sellpoint).indexOf('vsr_sku='),trim($sellpoint).indexOf(';'));
										$sellonload = $("#sellpoint").html();
										$replacesellonload = trim($sellonload).substring(trim($sellonload).indexOf('vsr_sku='),trim($sellonload).indexOf('; window.show_vsr_button'));
										sellpointColl = $sellonload.replace($replacesellonload,$sellCut);
									}
								}
								$("#moduleRightRail").html($skuSideBarContent);
								$("#tabcontainer").html($innerContent);
								//populateTabArray();
								//Include chat content
								//$chatContainer.html($chatContent);
								skuQuickViewLoadEvent(ivGlobal,partNumber,false,false);
							});
							if(typeof(quickView)=='undefined' || typeof(quickView) === undefined || quickView !== true){
								if($('#shareThis')!==null){
									if($('#shareths')!==null){
										$("div#shareths").replaceWith($("div#shareThis"));
									}
								}
								if($('#webcolloutput')!==null){
									$("webcolloutput").html(tempColl);
								}
								if($('#sellpntoutput')!==null){
									$("#sellpntoutput").html(sellpointColl);
								}
								//Show the 'reqrecsidebar' personalization carousel in the tabs after clicking on the 
								//child skus in the collection carousel for collection page
								if($("#reqrecsidebar").html()){
									showme('reqrecsidebar');
								}
							}
							$('h5#stepone').html(swatchHeader);
							if (window.ActiveXObject){
								if(getIEVersion() >= 9){
									if(document.title.indexOf("#collAttrId")!=-1){
										document.title = document.title.split("#collAttrId")[0];
									}
								}
							}
							enableDisableCartCollections(false);
							// SKU Tab init
							var infoTabs = $('ul#skuTabList'),
								infoTabContent = $('div.skuTabSlide');
							STAPLES.SkuTabs.initTab(infoTabs,infoTabContent);
						}
					});
					
					} catch(e){
						alert("Exception"+e);
					}
				}else{
					skuQuickViewLoadEvent(ivGlobal,partNumber,false,false);
				}
				//obatinthe attributeValueIds for a catentryId from the Json Variable. This Json variable will be populated in skuheaderinc.jsp
				json = $.parseJSON(jsonvariable);
				greyoutSwatchArr=$.parseJSON(greyoutSwatch);
				//json = eval( "(" + jsonvariable + ")");
				//greyoutSwatchArr=eval( "(" + greyoutSwatch + ")");
				catIdValue = json[catEntryId];
				for(i=0;i<catIdValue.length;i++){
					attrValues=attrValues+catIdValue[i];
					//For a catenrtyId get the attribute ValueId's and separate with the separator "|"
					greyoutSwatchArrId=greyoutSwatchArr[catIdValue[i]];
					if( typeof(greyoutSwatchArrId)=='undefined'){
						selectswatch=catIdValue[i];
					}else{
						for(j=0;j<greyoutSwatchArrId.length;j++){
							if(greyoutSwatchArrId[j]!=selectswatch){
								swatchAttrValues =swatchAttrValues+greyoutSwatchArrId[j];
								if(j!=greyoutSwatchArrId.length-1){
									swatchAttrValues=swatchAttrValues+"|" ;
								} 
							}
						}
					}
					if(i!=catIdValue.length-1){
						attrValues=attrValues+"|" ;
					}
				}

				//setup global variables- pulling elements from DOM for later use    
				xmlSkuAsString = loadXMLStringForSkuset();
				//Pull HTML DOM for Product Catalog (with children Product Set Elements) and load into an XML DOM
				xmlSkuStrAsObj = loadSkuXMLString(xmlSkuAsString);
				//expDel = $("#stage .delinfo li.expectdel").html();
				//Take the XML Doc, prepared above, and feed this into the XSLT Processor to Display the Products in the HTML DOM
				if(isBrandPage === undefined || isBrandPage === false){
					//call the function to apply XSL transformation for skuset.xsl
					refreshSkuHeader(xmlSkuStrAsObj,attrValues,catEntryId,colFlag,carouselPage);//The value of pageName will be 'quickview'or 'skuset' depending on the page it calls.
					if(eval("typeof (fnPCChangeSkuInfo) == 'function'")){
						fnPCChangeSkuInfo(xmlSkuStrAsObj, partNumber);
					}
				}
		
				divId = "#"+partNumber+"_"+catEntryId;
				$(divId).parent().addClass("selected");
				t_skuclick_end = new Date().getTime();   
				if( alertSKUClick){
					var etime=t_skuclick_end-t_skuclick_start;            
					$("#debug").append('<br /> PerfSwatchClick =' + etime);
				}
				attrvalueId=swatchAttrValues.split("|");
				for(i=0;i<attrvalueId.length;i++){
					id = attrvalueId[i];
					if(count==0){
						$('div.selectSwatch ul li[class!=selected] a[rel!='+id+']').addClass("disableSwatch").attr('href','javascript:void(0);').removeAttr('onclick');// for diableSwatch and preventing onclick event
						count++;
					}else{
						$('div.selectSwatch ul li[class!=selected] a[rel='+id+']').removeClass("disableSwatch");    
					}
				
				}
				if($("#chatcontent").html()!==null){
					chatText = $(".sideBarWrapper #chatcontent").html();
					$chatContainer = $(".printChat #chatholder");
					$chatContainer.html(chatText);
				}else{
					$(".printChat #chatholder").html(collectionChat);
				}
				if(!isSecure){
					ATCDropdownInit();
				}
			}

			//Description       :   This method will refresh the carousel part in collection page
			function applyXslTransformationCarousel(xmlCarouselStrAsObj,selectedSWATCH){
				var XSLTCarouselCompiled,
					stageElement,
					scripts,
					k = 0,
					code = '',
					j = 0;
				
				if(window.ActiveXObject){
					if( carouselXslLoaded == false){
						// 01/11/2010 : Put this line back in if following line fails -> var XSLTCompiled = new ActiveXObject("Msxml2.XSLTemplate.3.0");
						XSLTCarouselCompiled = new ActiveXObject("MSXML2.XSLTemplate");
						XSLTCarouselCompiled.stylesheet = carouselXSL.documentElement;
						XSLTCarouselProc = XSLTCarouselCompiled.createProcessor();
						carouselXslLoaded = true;
					}
					XSLTCarouselProc.input = xmlCarouselStrAsObj;
					XSLTCarouselProc.addParameter("selectedSWATCH", selectedSWATCH);
					XSLTCarouselProc.transform();
					stageElement = $("#collection_box");
					stageElement.html('');
					stageElement.html("<span style= \"display:none\">none</span>"+unencodeSkuHTMLFromResultDocument(XSLTCarouselProc.output));
					//all this , just to execute scripts embedded in the XSL...
					scripts = stageElement.find("script");
					for (k = 0; k < scripts.length; i++) {
						code = "";
						if (scripts[k].innerHTML) {
							code = scripts[k].innerHTML;
						}

						if (code){
							window.execScript(code,"JavaScript");
						}
					}
				}else if (document.implementation && document.implementation.createDocument){
					var resultCarouselDocument;
					if (carouselXslLoaded == false){
						collectionXsltProcessor=new XSLTProcessor();
						collectionXsltProcessor.importStylesheet(carouselXSL);
						carouselXslLoaded = true;
					}
			
					collectionXsltProcessor.setParameter(null, "selectedSWATCH", selectedSWATCH);
					resultCarouselDocument = collectionXsltProcessor.transformToFragment(xmlCarouselStrAsObj,document);
					stageElement = $("#collection_box");
					stageElement.html('');
					stageElement.html(resultCarouselDocument);
					stageElement.html(unencodeSkuHTMLFromResultDocument(stageElement.html()));
					//all this , just to execute scripts embedded in the XSL...
					scripts = stageElement.find("script");
					for (j = 0; j < scripts.length; j++) {
						code = "";
						if (scripts[j].innerHTML) {
							code = scripts[j].innerHTML;
						}

						if (code) {
							eval(code);
						}
					}
				}
			}
			
			//Description       :   This method will refresh the header part in collection page
			function applyTransformationCollection(xmlSkuObj,selectedSWATCH,expDel,skuSetId,colFlag){
				refreshSkuHeader(xmlSkuObj,selectedSWATCH,skuSetId,colFlag);
				$("#stage .checkmarks li.expectdel").html(expDel);
				$("#stage .checkmarks li.expectdel").removeClass("hide");
				$("#stage .checkmarks li.instockonline").removeClass("hide");
			}
			
			function refreshSkuHeader(xmlSkuObj,selectedSWATCH,skuSetId,colFlag,carouselPage){
				var XSLTSkuCompiled,
					resultSkuDocument,
					stageElement,
					scripts,
					i = 0,
					code = '';

				if (window.ActiveXObject){
					//Do not load the XSL and Import the XSL into the Processor, after it has already been done
					if( skuXslLoaded == false){
						// Put this line back in if following line fails -> var XSLTCompiled = new ActiveXObject("Msxml2.XSLTemplate.3.0");
						XSLTSkuCompiled = new ActiveXObject("MSXML2.XSLTemplate");
						//test code end
						XSLTSkuCompiled.stylesheet = xmlSkuSetString.documentElement;
						// create XSL-processor
						XSLTSkuProc = XSLTSkuCompiled.createProcessor();
						skuXslLoaded = true;
					}
					XSLTSkuProc.input = xmlSkuObj;
					XSLTSkuProc.addParameter("selectedSKU", skuSetId);
					if (typeof(quickView)=='undefined' || typeof(quickView)== undefined || quickView!==true){   
						XSLTSkuProc.addParameter("pageName", "Collection");//variable pageName is to identify whether the call is from sku/skuset or quickview
					} else {
						XSLTSkuProc.addParameter("pageName", "quickview");//variable pageName is to identify whether the call is from sku/skuset or quickview   
					}
					XSLTSkuProc.addParameter("appendPriceFlag","0");
					XSLTSkuProc.addParameter("selectedSWATCH", selectedSWATCH);
					XSLTSkuProc.addParameter("colFlag", colFlag);
					XSLTSkuProc.addParameter("exitURL","http://"+serverName+"/product_");
					XSLTSkuProc.transform();
					stageElement = $("#stage");
					stageElement.html('');
					stageElement.html("<span style= \"display:none\">none</span>"+unencodeSkuHTMLFromResultDocument(XSLTSkuProc.output));
					//all this , just to execute scripts embedded in the XSL...
					scripts = stageElement.find("script");
					for (i = 0; i < scripts.length; i++) {
						code = "";
						if (scripts[i].innerHTML) {
							code = scripts[i].innerHTML;
						}

						if (code){
							window.execScript(code,"JavaScript");
						}
					}
					
				}
				// code for Mozilla, Firefox, Opera, etc.
				else if (document.implementation && document.implementation.createDocument){
					//Do not load the XSL and Import the XSL into the Processor, after it has already been done
					if( skuXslLoaded == false){
						skuXsltProcessor=new XSLTProcessor();
						skuXsltProcessor.importStylesheet(xmlSkuSetString);
						skuXslLoaded = true;
					}
					skuXsltProcessor.setParameter(null, "selectedSKU",skuSetId);
					if (typeof(quickView)=='undefined' || typeof(quickView)=== undefined || quickView!==true){   
						skuXsltProcessor.setParameter(null, "pageName", "Collection");//variable pageName is to identify whether the call is from sku/skuset or quickview
					} else {
						skuXsltProcessor.setParameter(null, "pageName", "quickview");//variable pageName is to identify whether the call is from sku/skuset or quickview    
					}
					skuXsltProcessor.setParameter(null, "appendPriceFlag", "0");
					skuXsltProcessor.setParameter(null, "selectedSWATCH", selectedSWATCH);
					skuXsltProcessor.setParameter(null, "colFlag", colFlag);
					skuXsltProcessor.setParameter(null, "exitURL","http://"+serverName+"/product_");
					resultSkuDocument = skuXsltProcessor.transformToFragment(xmlSkuObj,document);
					
					//this string replacement is not fast, doing this any earlier on the XML Doc will cause parsing errors
					//.. so it must be done after the transformation.

					stageElement = $("#stage");
		            stageElement.html('');
		            stageElement.html(resultSkuDocument);//needed to create an HTML- String object for replace (can't do this on a DOM)
		            stageElement.html(unencodeSkuHTMLFromResultDocument(stageElement.html()));
					//all this , just to execute scripts embedded in the XSL...
					scripts = stageElement.find("script");
					for (i = 0; i < scripts.length; i++) {
						code = "";
						if (scripts[i].innerHTML) {
							code = scripts[i].innerHTML;
						}
						if (code) {
							eval(code);
						}
					}
				}
				applyTransformationCollSidebar(xmlSkuObj,selectedSWATCH,skuSetId,colFlag,carouselPage);
			
				if (typeof(quickView)=='undefined' || quickView === undefined || quickView!==true){
					applyXslTransformationCarousel(xmlSkuObj,selectedSWATCH);
					//call prepCArousel method to display in the form of carousel
					STAPLES.Personalization.prepCarousel('collection_box',true);   
					if(carouselPage>1) {
						STAPLES.Personalization.pageChanger($('#collection_box'),carouselPage,0);//sets the active page after selecting carousel item
					}
				}

				if( typeof(quickView)!= 'undefined' && quickView !== undefined && quickView===true){
					$('.quickViewOverlay .copyBullets ul li').jTruncate({
						length: 100,
						minTrail: 20,
						moreText: "...",
						lessText: "hide"
					});
				}else {
					$('.skuWrapper .copyBullets ul li').jTruncate({
						length: 100,
						minTrail: 20,
						moreText: "...",
						lessText: "hide"
					});
				}

				hideCheckmarks();
			}

			// Description : Function for applying the skusidebar xsl for collections (SKU Page redesign)
			function applyTransformationCollSidebar(xmlSkuObj,selectedSWATCH,skuSetId,colFlag,carouselPage){
				var stageElement,
					resultSkuDocument,
					XSLTSkuRRCompiled,
					scripts,
					i = 0,
					code = "";

				if (window.ActiveXObject){
					//Do not load the XSL and Import the XSL into the Processor, after it has already been done
					if( skuRightRailXslLoaded == false){
						// Put this line back in if following line fails -> var XSLTCompiled = new ActiveXObject("Msxml2.XSLTemplate.3.0");
						XSLTSkuRRCompiled = new ActiveXObject("MSXML2.XSLTemplate");
						//test code end
						XSLTSkuRRCompiled.stylesheet = xmlSkuSidebarString.documentElement;
						// create XSL-processor
						XSLTSkuRRProc = XSLTSkuRRCompiled.createProcessor();
						skuRightRailXslLoaded = true;
					}
					XSLTSkuRRProc.input = xmlSkuObj;
					XSLTSkuRRProc.addParameter("selectedSKU", skuSetId);
					XSLTSkuRRProc.addParameter("pageName", "Collection");//variable pageName is to identify whether the call is from sku/skuset or quickview
					XSLTSkuRRProc.addParameter("appendPriceFlag","0");
					XSLTSkuRRProc.addParameter("selectedSWATCH", selectedSWATCH);
					XSLTSkuRRProc.addParameter("colFlag", colFlag);
					XSLTSkuRRProc.addParameter("exitURL","http://"+serverName+"/product_");
					XSLTSkuRRProc.transform();
					stageElement = $("#stage2");
					stageElement.html('');
					stageElement.html("<span style= \"display:none\">none</span>"+unencodeSkuHTMLFromResultDocument(XSLTSkuRRProc.output));
					//all this , just to execute scripts embedded in the XSL...
					scripts = stageElement.find("script");
					for (i = 0; i < scripts.length; i++) {
						code = "";
						if (scripts[i].innerHTML) {
							code = scripts[i].innerHTML;
						}

						if (code){
							window.execScript(code,"JavaScript");
						}
					}
				// code for Mozilla, Firefox, Opera, etc.
				} else if (document.implementation && document.implementation.createDocument){
					//Do not load the XSL and Import the XSL into the Processor, after it has already been done
					if( skuRightRailXslLoaded == false){
						skuRRXsltProcessor=new XSLTProcessor();
						skuRRXsltProcessor.importStylesheet(xmlSkuSidebarString);
						skuRightRailXslLoaded = true;
					}
					skuRRXsltProcessor.setParameter(null, "selectedSKU",skuSetId);
					skuRRXsltProcessor.setParameter(null, "pageName", "Collection");//variable pageName is to identify whether the call is from sku/skuset or quickview
					skuRRXsltProcessor.setParameter(null, "appendPriceFlag", "0");
					skuRRXsltProcessor.setParameter(null, "selectedSWATCH", selectedSWATCH);
					skuRRXsltProcessor.setParameter(null, "colFlag", colFlag);
					skuRRXsltProcessor.setParameter(null, "exitURL","http://"+serverName+"/product_");
					resultSkuDocument = skuRRXsltProcessor.transformToFragment(xmlSkuObj,document);
				
					//this string replacement is not fast, doing this any earlier on the XML Doc will cause parsing errors
					//.. so it must be done after the transformation.
					stageElement = $("#stage2");
					stageElement.html('');
					stageElement.html(resultSkuDocument);//needed to create an HTML- String object for replace (can't do this on a DOM)
					stageElement.html(unencodeSkuHTMLFromResultDocument(stageElement.html()));
					//all this , just to execute scripts embedded in the XSL...
					scripts = stageElement.find("script");
					for (i = 0; i < scripts.length; i++) {
						code = "";
						if (scripts[i].innerHTML) {
							code = scripts[i].innerHTML;
						}
						if (code)
							eval(code);
					}
				}
			}

			function expandCollapsePromo(theLink) {
				var promoContainer,
					collapsedText,
					expandedText;
				
				promoContainer = $(theLink).closest(".promoMessage");
				collapsedText = 'See Details';
				expandedText = 'Collapse';
				$(promoContainer).toggleClass("expanded");
				$(promoContainer).toggleClass("collapsed");
				if (promoContainer.hasClass('collapsed')) {
					$(theLink).html(collapsedText);
				}else {
					$(theLink).html(expandedText);  
				}
			} 

			function enableDisableCart(theSelect) {
				var cartActions,
					skuValue,
					firstOption,
					styledDropdown;

				cartActions = $(theSelect).closest(".selectSkuSwatch").closest(".pricenew").siblings(".qty2").find(".cartActions").first();
				skuValue = $(theSelect).val();
				firstOption = $(theSelect).children("option:first").val();
				styledDropdown = $(theSelect).closest(".selectSkuSwatch").find(".ui-selectmenu").first();

				if (skuValue == firstOption) {
					$(theSelect).addClass("needInput");
					$(styledDropdown).addClass("needInput");
					$(cartActions).addClass("disabled");
					$(cartActions).find(".buttonLarge").addClass("buttonPrimaryLarge_disabled").removeClass("buttonPrimaryLarge");
					$(cartActions).find("input").attr("disabled","disabled");
					$(cartActions).find("a").bind("click",function(e){
						e.preventDefault();
					});
					$('.reviewsHeader .stReviews').css('display','block');
				} else {
					$(theSelect).removeClass("needInput");
					$(styledDropdown).removeClass("needInput");
					$(cartActions).removeClass("disabled"); 
					$(cartActions).find(".buttonLarge").removeClass("buttonPrimaryLarge_disabled").addClass("buttonPrimaryLarge");
					$(cartActions).find("input").removeAttr("disabled");
					$(cartActions).find("a").unbind("click");
					$('.reviewsHeader .stReviews').css('display','none');
				}
			}

			function enableDisableCartCollections(disable) {
				var cartActions = $(".selectSkuSwatch").closest(".pricenew").siblings(".qty2").find(".cartActions").first();
				if (disable === true) {
					$(cartActions).addClass("disabled");
					$(cartActions).find(".buttonLarge").addClass("buttonPrimaryLarge_disabled").removeClass("buttonPrimaryLarge");
					$(cartActions).find("input").attr("disabled","disabled");
					$(cartActions).find("a").bind("click",function(e){
						e.preventDefault();
					});
					$('.reviewsHeader .stReviews').css('display','block');
				} else {
					$(cartActions).removeClass("disabled"); 
					$(cartActions).find(".buttonLarge").removeClass("buttonPrimaryLarge_disabled").addClass("buttonPrimaryLarge");
					$(cartActions).find("input").removeAttr("disabled");
					$(cartActions).find("a").unbind("click");
					$('.reviewsHeader .stReviews').css('display','none');
				}
			}

			function postSellpointLoad(){
				$("#skuTabList").children().removeClass("hide");
				$("#seeTechLinks").removeClass("hide");
			}

			function postWebCollageLoad(){
				$("#skuTabList").children().removeClass("hide");
				$("#seeTechLinks").removeClass("hide");
			}

			// hide the checkmarks div when there is an empty <ul> in it - added as a quick fix for CR111492
			function hideCheckmarks() {
				var checkMarksDiv = $(".checkmarks");
				if (checkMarksDiv.find("li").length == 0 ) {
					checkMarksDiv.css("display", "none");
				}
			}
			
			function ATCDropdownInit() {
				var skuSelect = $("#skuSelectControl");
				skuSelect.attr('onchange','').removeAttr('onchange');
				skuSelect.change(function(){
					SWATCH.selectDropdown('selectDropdown');
				});			
				if(skuSelect.is('select')){
					skuSelect.hide();
					skuSelect.selectmenu({style:'dropdown',width:'218',maxHeight:'400',menuWidth:'auto'});
					$('ul.ui-selectmenu-menu-dropdown li:last:contains("undefined")').remove(); //IE fix it appends an undefined LI at the bottom.
				}else{
					skuSelect.show();
				}
			}

			////////////////////////////////////////////////////////////////////////////////////////
			//  Function Name       :   captureSelect()
			//  Description         :   This function finds the relevant XML product node in the XML 
			//                          snippet included in the Class and Sku/SKuset templates using
			//                          the sku id and replaces the Sku/Skuset section of the page via
			//                          XSL Transform. It also replaces the tab structure below the 
			//                          Sku/Skuset section via ajax. 
			//  Input Parameters    :   skuID,NUM,pageName
			//  Output Parameters   :   None
			//  TODO                :   The ajax call currently retrieves a static HTML file. This 
			//                          should be replaced with a call to skuinfo2.jsp for the 
			//                          relevant data.
			/////////////////////////////////////////////////////////////////////////////////////////
			function captureSelect(SKU,NUM,pageName){
				if (typeof(quickView)=='undefined' || typeof(quickView) === undefined || quickView!==true){
					if($('#check') === null  && $('#shareThisDum') !== null && $('#shareThis') !== null){
						var innerDiv = "<div id='check'></div>";
						$('#shareThisDum').append(innerDiv);
						$("div#check").replaceWith($("div#shareThis"));
					}
				}
				var qsURL = "",
					errorURL = "",
					methodName,
					t_displayResult_start,
					isBrandPage=false;//variable used to identify if its brand page
		        if(typeof(quickView)!='undefined' && quickView === true){
		            qsURL = skuQuickviewURL;
		            errorURL = ajaxQuickviewErrorURL;
				}else{
		            qsURL = skusetURL;
		            errorURL = ajaxErrorURL;
		        }
		        methodName = 'captureSelect';
				t_displayResult_start = new Date().getTime();
				//setup global variables- pulling elements from DOM for later use  
				xmlSkuAsString = loadXMLStringForSkuset();
				//xmlSkuDoc = null;
				//Pull HTML DOM for Product Catalog (with children Product Set Elements) and load into an XML DOM
				xmlSkuStrAsObj = loadSkuXMLString(xmlSkuAsString);
				//Take the XML Doc, prepared above, and feed this into the XSLT Processor to Display the Products in the HTML DOM
				//need to compare this as reusable component considering the usage with comapre and hachchange
		        if(isBrandPage==undefined || isBrandPage==false){
		        	applyTransformationSku(xmlSkuStrAsObj,SKU,pageName);//The value of pageName will be 'quickview'or 'skuset' depending on the page it calls.
		        }
        
            
		        if(typeof(quickView)=='undefined' || quickView===false){
					var specialFlag = $("#spcl").val(),
						catalogId = document.getElementsByName("catalogId")[0].value,
						href = propertyValues.POST_DOMAIN+'skuinfotabs?partNumber='+NUM+'&catalogId='+catalogId+'&catentryId='+SKU+'&pageName=skuskuset&isSpecial='+specialFlag+'&URL=/&catalogId='+propertyValues.DEF_CATALOG_ID,
						randomNumForIE = Math.floor(Math.random()*1000001);
						
					try{
						// EGuner. 2011-09-10. Proactive Chat data exchange for changed/default SKU/SKUSet.
						// Even if the StplProChat.js is not included on the page the function should not
						// return an error. 
						if(eval("typeof (fnPCChangeSkuInfo) == 'function'")) {
							fnPCChangeSkuInfo(xmlSkuStrAsObj, NUM);
						}
			
						$.ajax({
							url: href + "&r=" + randomNumForIE,
							type: 'GET',
							dataType: 'xml',
							timeout: 20000,
							error: function(a,b,c){
								debugMessages.push('SkuSetPage: timeout or xml parse error on ' + qsURL);
								$("#debug").append('<br />SkuSetPage: timeout or xml parse error on ' + qsURL); 
								if (propertyValues.ajaxLoggingSwitch =='ON'){
									var ajaxExecutionTime= (new Date().getTime())-t_displayResult_start;
									errorURL=errorURL+'&methodName='+methodName+'&fileName='+fileName+'&ajaxURL='+encodeURIComponent(href)+'&timeTaken='+ajaxExecutionTime+'&perfLogSwitch='+propertyValues.ajaxPerformanceSwitch;
									$.ajax({
										 url: errorURL,
										 type: 'POST',
										 dataType: 'xml',
										 timeout: 20000,
										 success:function(){
												$("#pseudoblanket").removeClass('hide');
												$("#ajaxErrorMsg").removeClass('hide');
												$("dl.error dd").html(propertyValues.compAjaxErrorString+" <a href=\"javascript:getTheURLAndProceed();\">Try again</a>");
										 }
									})
								}
							},
							success: function(returnObj){
								var temp = "",
									sellpoint = "",
									tabcontainerElement = $("#tabcontainer"),
									rightrailcontainerElement = $("#moduleRightRail"),
									$chatContainer = $(".printChat #chatholder");
								
								$(returnObj).find('skuinfo').each(function(){
									var $innerContent=$(this).find('info').text(),
										$chatContent =$(this).find('chat').text(),
										$skubannerContent =$(this).find('skubanner').text(),
										$skuSideBarContent =$(this).find('sidebar').text(),
										$sellpoint,
										$sellCut,
										$sellonload,
										$replacesellonload;

									if(typeof(quickView)=='undefined' || typeof(quickView)=== undefined || quickView!==true){
										temp = trim($chatContent).substring(trim($chatContent).indexOf('<script src'),trim($chatContent).indexOf('</p>'));
										$sellonload = $("#sellpoint").html();
										if($sellonload != null){
											$sellpoint =$(this).find('sellpoint').text();
											$sellCut = trim($sellpoint).substring(trim($sellpoint).indexOf('vsr_sku='),trim($sellpoint).indexOf(';'));
											$sellonload = $("#sellpoint").html();
											$replacesellonload = trim($sellonload).substring(trim($sellonload).indexOf('vsr_sku='),trim($sellonload).indexOf('; window.show_vsr_button'));
											sellpoint = $sellonload.replace($replacesellonload,$sellCut);
										}
									}
									rightrailcontainerElement.html($skuSideBarContent);
									rightrailcontainerElement.append('</div></div>');
									tabcontainerElement.html($innerContent);
									tabcontainerElement.append('</div></div>');

									//SAPIENT SKU REDESIGN
									//After XSLT reinitializaing variables and STAPLES.init methd for tab and right rail functionality
									STAPLES.SkuTabs.init();
									//SAPIENT SKU REDESIGN ENDS
									//populateTabArray();
									if(typeof(quickView)!='undefined' && quickView === true){
										skuQuickViewLoadEvent(ivGlobal,NUM,true,false);
									}else{   
										//Include chat content
										$chatContainer.html($chatContent);
										skuQuickViewLoadEvent(ivGlobal,NUM,false,false);
										$('#skuBannerZone').html($skubannerContent);
										$('#skubannerholder').removeClass('hide');
									}
								});
								if(typeof(quickView) == 'undefined' || typeof(quickView) === undefined || quickView !== true){
									if($('#shareThis')!=null){
										$("div#shareths").replaceWith($("div#shareThis"));
									}
									if($('#webcolloutput')!=null){
										$("#webcolloutput").html(temp);
									}
									if($('#sellpntoutput')!=null){
										$("#sellpntoutput").html(sellpoint);
									}
									//Show the 'reqrecsidebar' personalization carousel in the tabs after a dropdown/swatch is selected
									//from  sku/skuset page
									if($("#reqrecsidebar").html()){
										showme('reqrecsidebar');
									}
								}
								if (window.ActiveXObject){
									if(getIEVersion() >= 9){
										removeHashForIE9();
									}
								}
							}
						});
					} catch(e){
					
					}
				}else{
					skuQuickViewLoadEvent(ivGlobal,NUM,true,false);
				}
			}
			
			function skuXlsTransform(data){
				if (window.ActiveXObject){
					xmlSkuSetString = new ActiveXObject ("MSXML2.FreeThreadedDomDocument");
					xmlSkuSetString.async = false;
					xmlSkuSetString.load(propertyValues.XSL_PATH+"skuset.xsl");
				}else{
					xmlSkuSetString = data;
				}
			}
			
			function skuSideXlsTransform(data){
				if (window.ActiveXObject){
					xmlSkuSidebarString = new ActiveXObject ("MSXML2.FreeThreadedDomDocument");
					xmlSkuSidebarString.async = false;
					xmlSkuSidebarString.load(propertyValues.XSL_PATH+"skusidebar.xsl");
				}else{
					xmlSkuSidebarString = data;
				}
			}
			function collectionXlsTransform(data){
				if (window.ActiveXObject){
					carouselXSL = new ActiveXObject ("MSXML2.FreeThreadedDomDocument");
					carouselXSL.async = false;
					carouselXSL.load(propertyValues.XSL_PATH+"collection_carousel.xsl");
				}else{
					carouselXSL = data;
				}
			}
			//init variables
			function init() {
				myName = genInstance();
				serverName = getServerName();
				//Invoking the hashChangeFunc function during windows hash change event
				window.onhashchange = hashChangeFuncSku;
				
				$(document).ready(function(){
					if(pageId=="skuskuset"){
						if( !xmlSkuAsString ) {
							xmlSkuAsString = loadXMLStringForSkuset();
						}
						//check if we have retrieved the sku set xml data
						if (window.ActiveXObject){// IE specific XSL load
							skuXlsTransform('');
							skuSideXlsTransform('');
							collectionXlsTransform('');
						}else{// Other browsers XSL load
							STAPLES.Utilities.loadXMLDoc(propertyValues.XSL_PATH+"skuset.xsl",skuXlsTransform);
							STAPLES.Utilities.loadXMLDoc(propertyValues.XSL_PATH+"skusidebar.xsl",skuSideXlsTransform);
							STAPLES.Utilities.loadXMLDoc(propertyValues.XSL_PATH+"collection_carousel.xsl",collectionXlsTransform);
						}
					}
				});
			}
			
			//return functions and variables that you want accessible outside of Sku
			return {
				init : init,
				ATCDropdownInit : ATCDropdownInit,
				captureSelect : captureSelect,
				collectionSwatchClick : collectionSwatchClick,
				compareWithSimilar : compareWithSimilar,
				displayHash : displayHash,
				displayHashForCollection : displayHashForCollection,
				displayPrice : displayPrice,
				enableDisableCart : enableDisableCart,
				enableDisableCartCollections : enableDisableCartCollections,
				expandCollapsePromo : expandCollapsePromo,
				getCollectionDetails : getCollectionDetails,
				genInstance : genInstance,
				getSkuSetIdFromXml : getSkuSetIdFromXml,
				hideCheckmarks : hideCheckmarks,
				hidePrice : hidePrice,
				loadSkuXMLString : loadSkuXMLString,
				loadXMLStringForSkuset : loadXMLStringForSkuset,
				nextImage: nextImage,
				postSellpointLoad : postSellpointLoad,
				postWebCollageLoad : postWebCollageLoad,
				previousImage : previousImage,
				remotelyswitchtab : remotelyswitchtab,
				removeTab : removeTab,
				setupImages : setupImages,
				skuQuickViewLoadEvent : skuQuickViewLoadEvent,
				switchtab : switchtab,
				skuSideXlsTransform : skuSideXlsTransform,
				skuXlsTransform : skuXlsTransform
			};
		
		})();
		
		return STAPLES;
    }(window.STAPLES || {}));
    
	//update the Global STAPLES name space with new functionality and variables
	window.STAPLES = STAPLES;
    
	// Run as soon as this file loads
	STAPLES.SKU.init();
	
	// page has loaded
	// $(window).load(function() {});// write functions which have to exectute on load

}(window, document, jQuery));

//Global variables used for third party JS files that haven't been updated to the new namespace
function postSellpointLoad() { STAPLES.SKU.postSellpointLoad(arguments); }
function postWebCollageLoad() { STAPLES.SKU.postWebCollageLoad(arguments); }

