<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" />
	<xsl:param name="selectedSKU"></xsl:param>
	<xsl:param name="pageName">skuset</xsl:param>
	<xsl:param name="selectedSWATCH"></xsl:param>
	<xsl:param name="colFlag">0</xsl:param>
	<xsl:param name="xslStoreId">10001</xsl:param>
	<xsl:param name="xslLangId">-1</xsl:param>
	<xsl:param name="xslCatalogId">10051</xsl:param>
	<xsl:param name="exitURL"></xsl:param>
	<xsl:param name="iskiosk">0</xsl:param>
	
	<xsl:param name="AddToCart"></xsl:param>
	<xsl:param name="Qty"></xsl:param>
	
	<xsl:template match="/">
		<xsl:apply-templates select="//product[@id=$selectedSKU]" />
	</xsl:template>
	<xsl:variable name="label_bmsm">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.bmsm']" />
	</xsl:variable>
	<xsl:variable name="label_finalprice">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.finalprice']" />
	</xsl:variable>
	<xsl:variable name="label_seepriceincart">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.priceincart']" />
	</xsl:variable>
	<xsl:variable name="label_selected">
	   	<xsl:value-of select="productcatalog/labels/label[@key='common.selected']" />
	</xsl:variable>
	<xsl:variable name="label_price">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.price']" />
	</xsl:variable>
	<xsl:variable name="label_item">
	   	<xsl:value-of select="productcatalog/labels/label[@key='common.item']" />
	</xsl:variable>
	<xsl:variable name="label_model">
	   	<xsl:value-of select="productcatalog/labels/label[@key='common.model']" />
	</xsl:variable>
	<xsl:variable name="label_addtofavorites">
	   	<xsl:value-of select="productcatalog/labels/label[@key='common.addtofavorites']" />
	</xsl:variable>
	<xsl:variable name="label_outofstock">
	   	<xsl:value-of select="productcatalog/labels/label[@key='skuset.outofstock']" />
	</xsl:variable>
	<xsl:variable name="label_free">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.free']" />
	</xsl:variable>
	<xsl:variable name="label_was">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.was']" />
	</xsl:variable>
	<xsl:variable name="label_reg">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.reg']" />
	</xsl:variable>
	<xsl:variable name="label_save">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.save']" />
	</xsl:variable>
	<xsl:variable name="label_seedetails">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.seedetails']" />
	</xsl:variable>
	<xsl:variable name="label_instsaving">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.instsaving']" />
	</xsl:variable>
	<xsl:variable name="label_collapse">
			<xsl:value-of select="productcatalog/labels/label[@key='price.collapse']" />
	</xsl:variable>
	<xsl:variable name="label_beforePresentation">
			<xsl:value-of select="productcatalog/labels/label[@key='price.beforePresentation']" />
	</xsl:variable>
	<xsl:variable name="label_before">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.before']" />
	</xsl:variable>
	<xsl:variable name="label_pricebefore">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.pricebefore']" />
	</xsl:variable>
	<xsl:variable name="label_priceafterrebate">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.priceafterrebate']" />
	</xsl:variable>
	<xsl:variable name="label_priceaftersavings">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.priceaftersavings']" />
	</xsl:variable>
	<xsl:variable name="label_freeitem">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.freeitem']" />
	</xsl:variable>
	<xsl:variable name="label_totalsavings">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.totalsavings']" />
	</xsl:variable>
	<xsl:variable name="label_additionaloffers">
		<xsl:value-of select="productcatalog/labels/label[@key='price.additionaloffers']" />
	</xsl:variable>
	<xsl:variable name="label_true">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.true']" />
	</xsl:variable>
	<xsl:variable name="label_aslowas">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.aslowas']" />
	</xsl:variable>
	<xsl:variable name="label_printableCoupons">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.printableCoupons']" />
	</xsl:variable>
	<xsl:variable name="label_instantcoupon">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.instantcoupon']" />
	</xsl:variable>
	<xsl:variable name="label_rebate">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.rebate']" />
	</xsl:variable>
	<xsl:variable name="label_rebateurl">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.rebateurl']" />
	</xsl:variable>
	<xsl:variable name="label_promotions">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.promotions']" />
	</xsl:variable>
	<xsl:variable name="label_value">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.value']" />
	</xsl:variable>
	<xsl:variable name="label_instorespecial">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.instorespecial']" />
	</xsl:variable>
	<xsl:variable name="label_availableinstore">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.availableinstore']" />
	</xsl:variable>
	<xsl:variable name="label_qty">
	   <xsl:if test="$Qty!=''"><xsl:value-of select="$Qty" /></xsl:if>
	    <xsl:if test="$Qty=''">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.qty']" /></xsl:if>
	</xsl:variable>
	
	<xsl:variable name="label_addtocart">
	    <xsl:if test="$AddToCart!=''"><xsl:value-of select="$AddToCart" /></xsl:if>
	    <xsl:if test="$AddToCart=''">
	   	<xsl:value-of select="productcatalog/labels/label[@key='price.addtocart']" /></xsl:if>
	</xsl:variable>
	
	
	<xsl:template match="product">
		<xsl:variable name="skuType" select="@type"/>
		<xsl:variable name="swatchAttr_id" select="@swatchattr_id"/>
		<xsl:variable name="presentationType" select="../product/@presntype"/>
		<xsl:variable name="skuSetId" select="../product/@id"/>
		<xsl:variable name="presentationName" select="../product/@presnvalue"/>
        <xsl:variable name="skuWithSuffix">
        <xsl:choose>
            <xsl:when test="price/@suffix">
                <xsl:value-of select="@snum" />-<xsl:value-of select="price/@suffix" />
            </xsl:when>
            <xsl:otherwise> 
                <xsl:value-of select="@snum" />
            </xsl:otherwise>    
            </xsl:choose>
        </xsl:variable>	

				<xsl:variable name="prdTypeId">
					<xsl:value-of select="@prdtypeid" />
				</xsl:variable>
				
				<div class="pricenew">
					<xsl:variable name="saveDeduc">
						<xsl:choose>
							<xsl:when test="price/@save">
								<xsl:value-of select="price/@save" />
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="0.0" />
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					
					<xsl:variable name="formattedTotalSavings"
						select="format-number(number($saveDeduc),'$#0.00')" />
					<xsl:variable name="finalPriceDeduction">
						<xsl:choose>
							<xsl:when test="price/@fdeduc">
								<xsl:value-of select="number(price/@fdeduc)" />
							</xsl:when>
							<xsl:otherwise>
								<xsl:text>0</xsl:text>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					<xsl:variable name="bmsmMs">
						<xsl:for-each select="price/bmsm">
							<xsl:choose>
								<xsl:when
									test="number(@qmax) = 0 or number(@qmax)>=999 or number(@qmax)= -1">
									&lt;dd&gt;
									&lt;b&gt;
									&lt;i&gt;
									<xsl:value-of select="@qmin" />
									+ @
									<xsl:value-of select="format-number(number(@price),'$#0.00')" />
									&lt;/i&gt;
									&lt;/b&gt;
									&lt;/dd&gt;
								</xsl:when>
								<xsl:otherwise>
									&lt;dd&gt;
									<xsl:value-of select="@qmin" />
									-
									<xsl:value-of select="@qmax" />
									@
									<xsl:value-of select="format-number(number(@price),'$#0.00')" />
									&lt;/dd&gt;
								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
					</xsl:variable>
					<xsl:variable name="bmsmStr">
						<xsl:if test="$bmsmMs!='' and not(./@priceincart)">
							<xsl:element name="dd">
								<xsl:attribute name="class">bmsm skupflag</xsl:attribute>
								<xsl:choose>
									<xsl:when test="not(price/promo_text[@typeid='17'])">
										&lt;dt&gt;
										<xsl:choose>
											<xsl:when test="price/@bmsmpromo">
												Buy More Save More
											</xsl:when>
											<xsl:otherwise>
												<xsl:for-each select="price/promo_icon">
													<xsl:value-of select="./@name" disable-output-escaping="yes" />
												</xsl:for-each>
											</xsl:otherwise>
										</xsl:choose>
										&lt;/dt&gt;
									</xsl:when>
									<xsl:otherwise>
										&lt;dt&gt;Buy More Save More:&lt;/dt&gt;
									</xsl:otherwise>
								</xsl:choose>
								<xsl:value-of select="$bmsmMs" />
							</xsl:element>
						</xsl:if>
					</xsl:variable>
					<xsl:variable name="temPriceToShow">
						<xsl:choose>
							<xsl:when test="number($finalPriceDeduction) &gt; 0">
								<xsl:choose>
									<xsl:when test="price/@fprice">
										<xsl:value-of select="number(price/@fprice)" />
									</xsl:when>
									<xsl:otherwise>
										<xsl:text>0</xsl:text>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="@price" />
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					<xsl:variable name="priceToShow">
						<xsl:choose>
							<xsl:when test="number($temPriceToShow) &lt;= 0">
								<xsl:text>FREE </xsl:text>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="format-number(number($temPriceToShow),'$#0.00')" />
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					<xsl:variable name="skuInfoMathStory">
					  &lt;table class="mathStory"&gt;
					  <xsl:choose>
							<xsl:when test="./@priceincart='1'">
								<xsl:if test="price/@was">
									&lt;tr class="lineItem"&gt; &lt;td class="lineItemLabel"&gt;<xsl:value-of select="$label_reg" />:&lt;/td&gt; 
									&lt;td class="lineItemPrice priceStrike"&gt;
									<xsl:value-of select="format-number(number(price/@was),'$#0.00')" />
									&lt;/td&gt; &lt;/tr&gt;
								</xsl:if>
							</xsl:when>
							<xsl:otherwise>
								<xsl:if test="$skuType ='sku' or $skuType='package'">
									<xsl:choose>
										<xsl:when test="price/@wasreg">
											<xsl:choose>
												<xsl:when test="$saveDeduc &lt;'0.0' ">
													&lt;tr class="lineItem"&gt; 
														&lt;td colspan="2"&gt;
															&lt;div class="gridWidth02 priceTotal withMath clearMargin"&gt;
																&lt;span class="finalPrice"&gt;<xsl:value-of select="product/@price" />*&lt;/span&gt;&lt;br /&gt;
																&lt;span class="totalText"&gt;<xsl:value-of select="price/@uom" />&lt;/span&gt;&lt;br /&gt;
																&lt;span class="totalText"&gt;*<xsl:value-of select="$label_price" />&lt;/span&gt;	
															&lt;/div&gt;
													 	&lt;/td&gt; 
													 &lt;/tr&gt;
												</xsl:when>
												<xsl:otherwise>
													<xsl:variable name="dWasReg">
														<xsl:choose>
															<xsl:when test="price/@wasreg='was'">
																<xsl:value-of select="$label_was" />
															</xsl:when>
															<xsl:when test="price/@wasreg='reg'">
																<xsl:value-of select="$label_reg" />
															</xsl:when>
														</xsl:choose>
													</xsl:variable>
													&lt;tr class="lineItem"&gt; &lt;td class="lineItemLabel"&gt;
													<xsl:value-of select="$dWasReg" />
													:&lt;/td&gt; &lt;td class="lineItemPrice priceStrike"&gt;
													<xsl:if test="price/@was">
														<xsl:value-of select="format-number(number(price/@was),'$#0.00')" />
													</xsl:if>
													&lt;/td&gt; &lt;/tr&gt;
												</xsl:otherwise>
											</xsl:choose>
										</xsl:when>
										<xsl:otherwise>
											<xsl:choose>
												<xsl:when
													test="number($saveDeduc &gt;0) or number($finalPriceDeduction) &gt; 0 or (price/rebate and number($finalPriceDeduction) = 0)">
													&lt;tr class="lineItem"&gt; &lt;td class="lineItemLabel"&gt; <xsl:value-of select="$label_price" />:&lt;/td&gt;
													&lt;td class="lineItemPrice"&gt; &lt;b&gt;
													<xsl:value-of select="format-number(number(price/@is),'$#0.00')" />
													&lt;/b&gt; &lt;/td&gt; &lt;/tr&gt;
												</xsl:when>
												<xsl:otherwise>
													&lt;tr class="lineItem"&gt; 
														&lt;td colspan="2"&gt;
															&lt;div class="gridWidth02 priceTotal clearMargin"&gt;
																&lt;span class="finalPrice"&gt;<xsl:value-of select="format-number(number(./@price),'$#0.00')" />&lt;/span&gt;&lt;br /&gt;
																&lt;span class="totalText"&gt;<xsl:value-of select="price/@uom" />&lt;/span&gt;&lt;br /&gt;	
															&lt;/div&gt;
													 	&lt;/td&gt; 
													 &lt;/tr&gt;
												</xsl:otherwise>
											</xsl:choose>
										</xsl:otherwise>
									</xsl:choose>
								</xsl:if>
								<xsl:if test="number($saveDeduc) > 0">
									&lt;tr class="lineItem"&gt; &lt;td class="lineItemLabel"&gt;Save:&lt;/td&gt; &lt;td class="lineItemPrice"&gt;-
									<xsl:value-of select="$formattedTotalSavings" />
									&lt;/td&gt; &lt;/tr&gt;
								</xsl:if>
								<xsl:variable name="skuInfoRebateMathStory">
									<xsl:variable name="cmplxRid">
										<xsl:value-of select="price/@cmplxrid" />
									</xsl:variable>
									<xsl:for-each select="price/rebate">
										<xsl:variable name="isCmplx" select="'false'" />
										<xsl:if test="@complex='0' and @amt!='0'">
											<xsl:choose>
												<xsl:when test="@pdf!=''">
													&lt;tr class="lineItem"&gt;
													&lt;td class="lineItemLabel"&gt;&lt;a href='
													<xsl:value-of select="@pdf" />'&gt;
													<xsl:value-of select="@rbtxt" />
													&lt;/a&gt;:&lt;/td&gt;
													&lt;td class="lineItemPrice"&gt; -
													<xsl:value-of select="format-number(number(@amt),'$#0.00')" />
													&lt;/td>
													&lt;/tr&gt;
												</xsl:when>
												<xsl:otherwise>
													&lt;tr class="lineItem"&gt;
													&lt;td class="lineItemLabel"&gt;&lt;a href='
													<xsl:value-of select="@detlsurl" />
													<xsl:text>?FindValue=</xsl:text>
													<xsl:value-of select="../../@snum" />
													<xsl:text>&amp;exitUrl=</xsl:text>
													<xsl:value-of select="$exitURL" />
													<xsl:value-of select="../../@snum" />'&gt;
													<xsl:value-of select="@rbtxt" />
													&lt;/a&gt;:&lt;/td&gt;
													&lt;td class="lineItemPrice"&gt; -
													<xsl:value-of select="format-number(number(@amt),'$#0.00')" />
													&lt;/td>
													&lt;/tr&gt;
												</xsl:otherwise>
											</xsl:choose>
										</xsl:if>
										<xsl:if
											test="(($cmplxRid = @rid) or (@complex='0' and (not(@amt) or @amt='0')))">
											&lt;tr class="lineItem"&gt;
											&lt;td class="lineItemLabel"&gt;
											<xsl:value-of select="@rbtxt" />:
											&lt;/td&gt;
											&lt;td class="lineItemPrice"&gt;&lt;a href='
											<xsl:value-of select="@detlsurl" />
											<xsl:text>?FindValue=</xsl:text>
											<xsl:value-of select="../../@snum" />
											<xsl:text>&amp;exitUrl=</xsl:text>
											<xsl:value-of select="$exitURL" />
											<xsl:value-of select="../../@snum" />'&gt;See
											Details&lt;/a&gt;&lt;/td&gt;
											&lt;/tr&gt;
										</xsl:if>
									</xsl:for-each>
								</xsl:variable>
								<xsl:variable name="skuInfoCouponMathStory">
									<xsl:for-each select="price/coupon[@auto = '1'] ">
										<xsl:if test="@amt &gt; '0' and not(@type)">
											&lt;tr class="lineItem"&gt; &lt;td class="lineItemLabel"&gt;Instant
											Savings:&lt;/td&gt; &lt;td class="lineItemPrice"&gt; -
											<xsl:value-of select="format-number(number(@amt),'$#0.00')" />
											&lt;/td&gt; &lt;/tr&gt;
										</xsl:if>
									</xsl:for-each>
								</xsl:variable>
								<xsl:if
									test="$skuType !='skuset' and price/@wasreg and($skuInfoRebateMathStory!='' or $skuInfoCouponMathStory!='') ">
									&lt;tr class="lineItem"&gt; &lt;td class="lineItemLabel highlight"&gt;Now:&lt;/td&gt; &lt;td class="lineItemPrice highlight"&gt;
									<xsl:value-of select="format-number(number(price/@is),'$#0.00')" />
									&lt;/td&gt; &lt;/tr&gt;
								</xsl:if>
								<xsl:value-of select="$skuInfoCouponMathStory" />
								<xsl:value-of select="$skuInfoRebateMathStory" />
								<xsl:choose>
									<xsl:when
										test="number($saveDeduc) &gt; 0 or number($finalPriceDeduction) &gt; 0">
										<xsl:choose>
											<xsl:when test="$skuInfoRebateMathStory!=''">
												<xsl:choose>
													<xsl:when test="price/@rwnd='true'">

														&lt;tr class="lineItem"&gt; 
															&lt;td colspan="2"&gt;
																&lt;div class="gridWidth02 priceTotal withMath clearMargin"&gt;
																	&lt;span class="finalPrice"&gt;<xsl:value-of select="$priceToShow" />*&lt;/span&gt;&lt;br /&gt;
																	&lt;span class="totalText"&gt;<xsl:value-of select="price/@uom" />&lt;/span&gt;&lt;br /&gt;
																	&lt;span class="totalText"&gt;*Price &lt;strong&gt;before&lt;/strong&gt;
																	<xsl:value-of select="price/@smry" />&lt;/span&gt;	
																&lt;/div&gt;
														 	&lt;/td&gt; 
														 &lt;/tr&gt;
														
													</xsl:when>
													<xsl:otherwise>
														&lt;tr class="lineItem"&gt; 
															&lt;td colspan="2"&gt;
																&lt;div class="gridWidth02 priceTotal withMath clearMargin"&gt;
																	&lt;span class="finalPrice"&gt;<xsl:value-of select="$priceToShow" />*&lt;/span&gt;&lt;br /&gt;
																	&lt;span class="totalText"&gt;<xsl:value-of select="price/@uom" />&lt;/span&gt;&lt;br /&gt;
																	&lt;span class="totalText"&gt;*Price &lt;strong&gt;after&lt;/strong&gt; rebate&lt;/span&gt;	
																&lt;/div&gt;
														 	&lt;/td&gt; 
														 &lt;/tr&gt;														
													</xsl:otherwise>
												</xsl:choose>
											</xsl:when>
											<xsl:otherwise>
												&lt;tr class="lineItem"&gt; 
													&lt;td colspan="2"&gt;
														&lt;div class="gridWidth02 priceTotal withMath clearMargin"&gt;
															&lt;span class="finalPrice"&gt;<xsl:value-of select="$priceToShow" />*&lt;/span&gt;&lt;br /&gt;
															&lt;span class="totalText"&gt;<xsl:value-of select="price/@uom" />&lt;/span&gt;&lt;br /&gt;
															&lt;span class="totalText"&gt;*Price &lt;strong&gt;after&lt;/strong&gt; savings&lt;/span&gt;	
														&lt;/div&gt;
												 	&lt;/td&gt; 
												 &lt;/tr&gt;
											</xsl:otherwise>
										</xsl:choose>
									</xsl:when>
									<xsl:when test="price/rebate and number($finalPriceDeduction) = 0">
										&lt;tr class="lineItem"&gt; 
											&lt;td colspan="2"&gt;
												&lt;div class="gridWidth02 priceTotal withMath clearMargin"&gt;
													&lt;span class="finalPrice"&gt;<xsl:value-of select="format-number(number(./@price),'$#0.00')" />*&lt;/span&gt;&lt;br /&gt;
													&lt;span class="totalText"&gt;<xsl:value-of select="price/@uom" />&lt;/span&gt;&lt;br /&gt;
													&lt;span class="totalText"&gt;*Price &lt;strong&gt;before&lt;/strong&gt;
													<xsl:value-of select="price/@smry" />&lt;/span&gt;	
												&lt;/div&gt;
										 	&lt;/td&gt; 
										 &lt;/tr&gt;
									</xsl:when>
								</xsl:choose>
							</xsl:otherwise>
						</xsl:choose>
						&lt;/table&gt;
								
					</xsl:variable>

					<xsl:if test="price/promo_icon and descs/desc[@typeid='17'] =''">
						<!-- in promo -->
						<div class="promoMessageWrapper">
							<div class="promoMessage">
							<div class="promoLabel"><xsl:value-of select="$label_promotions"/>:</div>
							<xsl:for-each select="price/promo_icon">
								<xsl:if test="normalize-space(.)">
									<h3>
										<xsl:value-of select="./@name" disable-output-escaping="yes" />
									</h3>
								</xsl:if>
							</xsl:for-each>
							</div>
						</div>
					</xsl:if>

					<xsl:variable name="productPriceDetails">
						<xsl:element name="dl">
							<xsl:attribute name="class">priceTotal w01</xsl:attribute>
							<xsl:choose>
								<xsl:when test="./@priceincart='1'">
									<xsl:if test="price/@was">																													&lt;dd class="pwas"&gt;
											<xsl:value-of select="$label_reg"/>  
											<xsl:element name="del">
													<xsl:value-of select="price/@is" />
											</xsl:element>
									</xsl:if>
									<xsl:element name="a">
											<xsl:attribute name="name">spic</xsl:attribute>
											<xsl:attribute name="onclick">popOverlay('/office/supplies/StaplesSkuOverlayProductDisplay?langId=<xsl:value-of select="$xslLangId" />&amp;storeId=<xsl:value-of select="$xslStoreId" />&amp;productId=<xsl:value-of select="./@id" />&amp;catalogId=<xsl:value-of select="$xslCatalogId" />',4)</xsl:attribute>
											<xsl:attribute name="class">buttonLink</xsl:attribute>
											<xsl:attribute name="rel">nofollow</xsl:attribute>
											<xsl:element name="div">
												<xsl:attribute name="class">buttonLarge buttonPrimaryLarge</xsl:attribute>
												<xsl:attribute name="id">spic</xsl:attribute>
												<xsl:element name="span">
													<xsl:attribute name="class">buttonText</xsl:attribute>
													<xsl:value-of select="$label_seepriceincart"/>
												</xsl:element>
											</xsl:element>
										</xsl:element>
									</xsl:when>
												<xsl:otherwise>
														<xsl:choose>
															<xsl:when test="number(price/@fsave) &gt;'0'">
																	<dd class="psave" onmouseover="STAPLES.SKU.displayPrice(this)" onmouseout="STAPLES.SKU.hidePrice(this)">
																		<xsl:element name="a">
																			<xsl:attribute name="href">#</xsl:attribute>
																			<xsl:attribute name="class">psavelink</xsl:attribute>
																			<xsl:attribute name="style">cursor: default;</xsl:attribute>
																			<xsl:attribute name="onclick">return false;</xsl:attribute>
																			<xsl:value-of select="$label_freeitem"/> <span> A <b><xsl:value-of select="format-number(number(price/@fsave),'$#0.00')" /></b> value </span>
																		</xsl:element>
																	</dd>
															</xsl:when>
															<xsl:when test="number($finalPriceDeduction) &gt; 0">
																&lt;dd class="psave" onmouseover="STAPLES.SKU.displayPrice(this)" onmouseout="STAPLES.SKU.hidePrice(this)"&gt;
																	&lt;a href="#" class="psavelink" style="cursor: default;" onclick=""&gt;
																		&lt;b&gt; 
																			<xsl:value-of select="$label_totalsavings"/>: 
																			&lt;i&gt;
																				<xsl:value-of select="format-number(number($finalPriceDeduction+$saveDeduc),'$#0.00')" />
																			&lt;/i&gt; 
																		&lt;/b&gt; 
																		&lt;br /&gt;
																		<xsl:value-of select="$label_seedetails"/>
																	&lt;/a&gt;
																&lt;/dd&gt;
															</xsl:when>
															<xsl:when test="number($saveDeduc) > 0">
																&lt;dd class="psave" onmouseover="STAPLES.SKU.displayPrice(this)" onmouseout="STAPLES.SKU.hidePrice(this)"&gt;
																	&lt;a href="#" class="psavelink" style="cursor: default;" onclick=""&gt;
																		&lt;b&gt; 
																			<xsl:value-of select="$label_totalsavings"/>: 
																			&lt;i&gt;
																				<xsl:value-of select="$formattedTotalSavings" />
																			&lt;/i&gt; 
																		&lt;/b&gt; 
																		&lt;br /&gt;
																		<xsl:value-of select="$label_seedetails"/>
																	&lt;/a&gt;
																&lt;/dd&gt;
															</xsl:when>
															<xsl:when test="price/@rwnd='true' or descs/desc[@typeid='35']">
																&lt;dd class="psave" onmouseover="STAPLES.SKU.displayPrice(this)" onmouseout="STAPLES.SKU.hidePrice(this)"&gt;
																	&lt;a href="#" class="psavelink" style="cursor: default;" onclick=""&gt;
																		<xsl:value-of select="$label_additionaloffers"/>&lt;br /&gt;<xsl:value-of select="$label_seedetails"/>
																	&lt;/a&gt;
																&lt;/dd&gt;
															</xsl:when>
														</xsl:choose>
													</xsl:otherwise>
												</xsl:choose>
											</xsl:element>
										</xsl:variable>
										<xsl:variable name="bFlyoverMathStory">
											<xsl:if test="price/freeitem or $productPriceDetails!=''">
												<xsl:value-of select="$label_true"/>
											</xsl:if>
										</xsl:variable>
										<xsl:choose>
											<xsl:when test="$productPriceDetails='' and price/bmsm">
												<xsl:element name="div">
													<xsl:attribute name="class">mathstory</xsl:attribute>
													<xsl:element name="dl">
														<xsl:attribute name="class">priceTotal</xsl:attribute>
														
														<xsl:element name="dd">
															<xsl:attribute name="class">finalPrice</xsl:attribute>
															<xsl:element name="b">
																<xsl:element name="i">
																	<xsl:value-of select="format-number(number(price/@is),'$#0.00')" />
																</xsl:element>
															</xsl:element>
														</xsl:element>
														<xsl:element name="dd">
															<xsl:attribute name="class">totalText</xsl:attribute>
															<xsl:value-of select="price/@uom" />
														</xsl:element>
														<xsl:choose>
															<xsl:when test="price/promo_icon and ./@topcustp='1'">
														 		<xsl:comment><!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation -->  </xsl:comment>
							                                	 <div id="skuPromoZone">
							                             		<xsl:comment><!-- End code change as part of Coupon creation based on customer segment.'Where' module implementation -->  </xsl:comment>
							                             		<h3 class="skupflag">
							                                      <xsl:for-each select="price/promo_icon">
							                                          <xsl:if test="normalize-space(.)">
							                                               <b>
							                                                  <xsl:value-of select="./@name" disable-output-escaping="yes" />
							                                              </b>
							                                          </xsl:if>
							                                      </xsl:for-each>
							                                  	</h3>
							                                  	
							                                  	<xsl:comment><!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation -->  </xsl:comment>
							                                  	</div>
							                                  	<xsl:comment><!-- End code change as part of Coupon creation based on customer segment.'Where' module implementation -->  </xsl:comment>
							                              	</xsl:when>
							                              	<xsl:otherwise>
							                             		<!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation --> 
							                              		<div id="skuPromoZone"></div>
							                              		<!-- End code change as part of Coupon creation based on customer segment.'Where' module implementation --> 
																<xsl:value-of select="$bmsmStr" disable-output-escaping="yes" />	
															</xsl:otherwise>
														</xsl:choose>
													</xsl:element>															
												</xsl:element>
											</xsl:when>
											<xsl:when test="$bFlyoverMathStory =''">
											<!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation --> 
											<div id="skuPromoZone"></div>
											<!-- End code change as part of Coupon creation based on customer segment.'Where' module implementation --> 
												<xsl:element name="dl">
													<xsl:attribute name="class">priceTotal</xsl:attribute>
													<xsl:element name="dt">
														<xsl:attribute name="class">totalText hide</xsl:attribute>
														<xsl:value-of select="$label_price"/>:
													</xsl:element>
														<xsl:if test="$skuType='skuset'">
															<xsl:element name="dt">
																<xsl:attribute name="class">totalText totalLow</xsl:attribute>			
																<xsl:value-of select="$label_aslowas"/>
															</xsl:element>
														</xsl:if>
														<xsl:if test="price/coupon[@auto = '1']">
															<xsl:element name="dd">
																<xsl:attribute name="class">pwas</xsl:attribute>
																<xsl:value-of select="$label_reg"/>.
																<xsl:element name="del">
																	<xsl:value-of select="price/@is" />
																</xsl:element>
															</xsl:element>
														</xsl:if>
														<xsl:element name="dd">
															<xsl:attribute name="class">finalPrice</xsl:attribute>
															<xsl:choose>
																<xsl:when test="./@priceincart='1'">
																	<xsl:element name="a">
																		<xsl:attribute name="name">spicmath</xsl:attribute>
																		<xsl:attribute name="onclick">popOverlay('/office/supplies/StaplesSkuOverlayProductDisplay?langId=<xsl:value-of select="$xslLangId" />&amp;storeId=<xsl:value-of select="$xslStoreId" />&amp;productId=<xsl:value-of select="./@id" />&amp;catalogId=<xsl:value-of select="$xslCatalogId" />',4)</xsl:attribute>
																		<xsl:attribute name="class">buttonLink</xsl:attribute>
																		<xsl:attribute name="rel">nofollow</xsl:attribute>
																		<xsl:element name="div">
																			<xsl:attribute name="class">buttonLarge buttonPrimaryLarge</xsl:attribute>
																			<xsl:attribute name="id">spic</xsl:attribute>
																			<xsl:element name="span">
																				<xsl:attribute name="class">buttonText</xsl:attribute>
																				<xsl:value-of select="$label_seepriceincart"/>
																			</xsl:element>
																		</xsl:element>
																	</xsl:element>
																</xsl:when>
															<xsl:otherwise>
																<xsl:choose>
																	<xsl:when test="price/@fprice and price/coupon[@auto='1']">
																		<xsl:element name="b">					
																			<xsl:element name="i">		
																				<xsl:value-of select="price/@fprice" />
																			</xsl:element>
																		</xsl:element>
																	</xsl:when>
																	<xsl:otherwise>
																		<xsl:element name="b">					
																			<xsl:element name="i">
																				<xsl:value-of select="format-number(number(price/@is),'$#0.00')" />	
																			</xsl:element>
																		</xsl:element>
																	</xsl:otherwise>
																</xsl:choose>
															</xsl:otherwise>
														</xsl:choose>
													</xsl:element>
													<xsl:if test="$skuType!='bundle' and not(./@priceincart)">
														<xsl:element name="dd">
															<xsl:attribute name="class">totalText</xsl:attribute>																									<xsl:value-of select="price/@uom" />
														</xsl:element>
													</xsl:if>
													<xsl:if test="number(./@fprice) &gt; 0">
														<xsl:element name="dd">
															<xsl:attribute name="class">psave</xsl:attribute>																									<xsl:if test="price/@save">
																<xsl:element name="b">					
																	<xsl:element name="i">			
																		Save $
																		<xsl:value-of select="price/@save" />
																	</xsl:element>
																</xsl:element>
															</xsl:if>
														</xsl:element>
													</xsl:if>
												</xsl:element>
												<xsl:choose>
													<xsl:when test="(price/coupon[@auto = '1'] and price/promo_icon) or price/rebate">
														<dl class="b4">
															<dt><xsl:value-of select="$label_before"/>:</dt>
															<xsl:if test="price/coupon">
																<ul>
																	<xsl:for-each select="price/coupon">
																		<xsl:choose>
																			<xsl:when test="@auto = '1'">
																				<li class="b4coup">
																					<xsl:value-of select="format-number(number(@amt),'$#0.00')" />
																					<xsl:value-of select="$label_instantcoupon"/>
																				</li>
																			</xsl:when>
																			<xsl:otherwise></xsl:otherwise>
																		</xsl:choose>
																	</xsl:for-each>
																</ul>
															</xsl:if>
															<xsl:if test="price/rebate">
																<ul>
																	<xsl:for-each select="price/rebate">
																		<li class="b4reb">
																			<xsl:value-of select="format-number(number(@amt),'$#0.00')" />
																			<br />
																			<a href="http://www.staplesrebates.com/weblogic/rebateshq/staples/searchPromotionsBySKUOrUPC?FindValue={../../@snum}&amp;exitUrl=www.staples.com">Rebate</a>
																		</li>
																	</xsl:for-each>
																</ul>
															</xsl:if>
														</dl>
													</xsl:when>
													<xsl:otherwise></xsl:otherwise>
												</xsl:choose>
												<xsl:if test="price/bmsm and not(./@priceincart)">
													<dl class="bmsm">
														<dt><xsl:value-of select="$label_bmsm"/></dt>
														<xsl:for-each select="price/bmsm">
															<dd>
																<xsl:choose>
																	<xsl:when test="@qmax='9999'">
																		<i>
																			<b>
																				<xsl:value-of select="@qmin" />
																				+ @
																				<xsl:value-of select="format-number(number(@price),'$#0.00')" />
																			</b>
																		</i>
																	</xsl:when>
																	<xsl:otherwise>
																		<xsl:value-of select="@qmin" />
																		-
																		<xsl:value-of select="@qmax" />
																		@
																		<xsl:value-of select="format-number(number(@price),'$#0.00')" />
																	</xsl:otherwise>
																</xsl:choose>
															</dd>
														</xsl:for-each>
													</dl>
												</xsl:if>
												<xsl:if test="price/@fprice">
													<xsl:choose>
														<xsl:when test="price/coupon[@auto != '1'] or price/rebate">
															<dl class="fp">
														<dt><xsl:value-of select="$label_finalprice"/>:</dt>
																<dd>
																	<b>
																		<xsl:value-of select="format-number(number(price/@fprice),'$#0.00')" />
																	</b>
																</dd>
															</dl>
														</xsl:when>
														<xsl:otherwise></xsl:otherwise>
													</xsl:choose>
												</xsl:if>
												
												<xsl:if test="price/coupon/@type='FREEITEM'">
													A <i><xsl:value-of select="format-number(number(price/coupon/@amt),'$#0.00')" /></i> <xsl:value-of select="$label_value"/>.
												</xsl:if>
												<xsl:for-each select="price/promo_text">
													<dl class="pr0m0">
														<dd>
															<xsl:value-of select="." disable-output-escaping="yes" />
														</dd>
													</dl>
												</xsl:for-each>
											</xsl:when>
											<xsl:when test="$bFlyoverMathStory ='true'">
												<div class="mathstory">
												
													<xsl:if test="price/top_promo_icon and ./@topcustp='1'">
														<div id="skuPromoZone">
														<h3 class="skupflag">
															<xsl:for-each select="price/top_promo_icon">
																<xsl:if test="normalize-space(.)">
																<img src="{.}" alt="{./@name}" />
																	<b>
																		<xsl:value-of select="./@name" disable-output-escaping="yes" />
																	</b>
																</xsl:if>
															</xsl:for-each>
														</h3>
														</div>
													</xsl:if>
													
															<xsl:element name="dl">
																	<xsl:attribute name="class">priceTotal</xsl:attribute>
																	<xsl:if test="$skuType='skuset' and not(./@priceincart)" >
																		<xsl:element name="dd">
																			<xsl:attribute name="class">totalText totalLow</xsl:attribute>
																			<xsl:value-of select="$label_aslowas"/>
																		</xsl:element>
																		<xsl:element name="dd">
																			<xsl:attribute name="class">finalPrice</xsl:attribute>
																			<xsl:element name="b">
																				<xsl:element name="i">
																					<xsl:value-of select="format-number(number(price/@is),'$#0.00')" />
																				</xsl:element>
																			</xsl:element>
																		</xsl:element>
																		<xsl:element name="dd">
																			<xsl:attribute name="class">totalText</xsl:attribute>
																			<xsl:value-of select="price/@uom" />
																		</xsl:element>
																		<xsl:value-of select="$bmsmStr" disable-output-escaping="yes" />
																	</xsl:if>	
															</xsl:element>
														<xsl:if test="$bmsmStr!='' and (price/promo_text or (price/promo_icon and ./@topcustp='1'))">
															<xsl:value-of select="$bmsmStr" disable-output-escaping="yes"/>
														</xsl:if>
														<xsl:if test="price/freeitem or $productPriceDetails!=''">
															<xsl:value-of select="$skuInfoMathStory" disable-output-escaping="yes" />
														</xsl:if>
														
													<!-- </div> -->
													<!-- <xsl:element name="dl">
														<xsl:attribute name="class">theprice w01</xsl:attribute>
														<xsl:value-of select="$productPriceDetails" disable-output-escaping="yes" />
													</xsl:element>  -->
												</div>
											</xsl:when>
										</xsl:choose>
										<div class="selectSkuSwatch">
											
										<xsl:if test="($presentationType = 'D')">
											<div class="skuSelectControl">
												<p>
													<xsl:for-each select="../product">
														<xsl:if test="@id = $selectedSKU ">
															<xsl:if test="position() = 1">
																<xsl:attribute name="class"><xsl:text>unselected</xsl:text></xsl:attribute>
															</xsl:if>
															<xsl:value-of select="@presnvalue" />
														</xsl:if>
													</xsl:for-each>
													<span class="select_arrow"></span> 
												</p>
												<ul class="skuset_dropdown">
													<xsl:for-each select="../product">
														<xsl:if test="@type ='skuset'">
															<xsl:element name="li">
																<xsl:if test="$skuType ='skuset'">
																	<xsl:attribute name="class"><xsl:value-of select="$label_selected" /></xsl:attribute>
																</xsl:if>
																<xsl:element name="a">
																	<xsl:attribute name="href"><xsl:value-of select="producturl"/></xsl:attribute>
																	<xsl:attribute name="class">
																		<xsl:value-of select="@snum" />_<xsl:value-of select="@id" />
																	</xsl:attribute>
																	<xsl:value-of select="@presnvalue" />
																</xsl:element>
															</xsl:element>
														</xsl:if>
														<xsl:if test="not(@presntype)">
															<xsl:element name="li">
																<xsl:if test="@id = $selectedSKU ">
																	<xsl:attribute name="class"><xsl:value-of select="$label_selected" /></xsl:attribute>
																</xsl:if>
																<xsl:choose>
																	<xsl:when test="not(@presnvalue)">
																		<xsl:element name="a">
																			<xsl:attribute name="href"><xsl:value-of select="producturl"/></xsl:attribute>
																			<xsl:attribute name="class">
																				<xsl:value-of select="@snum" />_<xsl:value-of select="@id" />
																			</xsl:attribute>
																			<xsl:value-of select="@name" disable-output-escaping="yes"/>
																		</xsl:element>
																	</xsl:when>
																	<xsl:otherwise>
																		<xsl:element name="a">
																			<xsl:attribute name="href"><xsl:value-of select="producturl"/></xsl:attribute>
																			<xsl:attribute name="class">
																				<xsl:value-of select="@snum" />_<xsl:value-of select="@id" />
																			</xsl:attribute>
																			<xsl:value-of select="@presnvalue" disable-output-escaping="yes"/>
																		</xsl:element>
																	</xsl:otherwise>
																</xsl:choose>
															</xsl:element>
														</xsl:if>
													</xsl:for-each>
												</ul>
											</div>
											<div id="dropdown" style="display: none;">
												<xsl:for-each select="../product">
													<xsl:if test="not(@presntype)">
														<xsl:element name="a">
															<xsl:attribute name="href"><xsl:value-of select="producturl"/></xsl:attribute>
															<xsl:value-of select="@presnvalue" />
														</xsl:element>
													</xsl:if>
												</xsl:for-each>
											</div>
										</xsl:if>
										<xsl:if test="($presentationType = 'S')">
											<p class="infoMessage hide"><xsl:value-of select="$label_beforePresentation" disable-output-escaping="yes"/></p>
											<div id="skuSelectControl" class="qty2 colorSwatches swatchUnselected">
												<div class="selectSwatch">
													<h5><xsl:value-of select="$presentationName" /></h5>
													<xsl:element name="ul">
														<xsl:for-each select="../product">
															<xsl:variable name="catentryId">
																<xsl:value-of select="@id" />
															</xsl:variable>
															<xsl:if test="@presnvalue and @type !='skuset'">
																<xsl:element name="li">
																	<xsl:attribute name="id"><xsl:text>swatch_</xsl:text><xsl:value-of select="@id" /></xsl:attribute>
																	<xsl:if test="@id = $selectedSKU">
																		<xsl:attribute name="class"><xsl:value-of select="$label_selected" /></xsl:attribute>
																	</xsl:if>
																	<xsl:element name="a">
																		<xsl:attribute name="href"><xsl:value-of select="producturl"/></xsl:attribute>
																		<xsl:attribute name="onclick">javascript:SWATCH.swatchClick('<xsl:text>swatch_</xsl:text><xsl:value-of select="@id" />','swatchClick');return false;</xsl:attribute>
																		<xsl:attribute name="rel">
																			<xsl:value-of select="@snum" />_<xsl:value-of select="@id" />
																		</xsl:attribute>
																		<xsl:element name="img">
																			<xsl:attribute name="src">
																				<xsl:value-of select="@presnvalue" />
																			</xsl:attribute>
																			<xsl:attribute name="alt"><xsl:value-of select="@alttext" />
																			</xsl:attribute>
																		</xsl:element>
																		<xsl:element name="span">
																			<xsl:attribute name="class">color</xsl:attribute>
																			<xsl:value-of select="@presnvalue" />
																		</xsl:element>
																	</xsl:element>
																</xsl:element>
															</xsl:if>
														</xsl:for-each>
													</xsl:element>
												</div>
											</div>
										</xsl:if>
										<xsl:if test="($presentationType = 'C')">
											<p class="infoMessage hide"><xsl:value-of select="$label_beforePresentation" disable-output-escaping="yes"/></p>
											<div id="skuSelectControl" class="qty2 colorSwatches swatchUnselected">
												<div class="selectSwatch">
													<h5 id="stepone"><xsl:value-of select="@swatch_header" /></h5>
													<xsl:element name="ul">
														<xsl:for-each select="//collection">
															<xsl:if test="@dispseq='1'">															
																<xsl:element name="li"> 
																  <xsl:call-template name="SwatchSelection">
          																<xsl:with-param name="list" select="$selectedSWATCH" ></xsl:with-param>
          														 </xsl:call-template>
																	<xsl:element name="a">
																		<xsl:attribute name="href"><xsl:value-of select="producturl"/></xsl:attribute>
																		<xsl:attribute name="onclick">javascript:SWATCH.collectionSwatchClick('<xsl:value-of select="@attrvalueid" />','<xsl:value-of select="$selectedSKU" />','0','swatchClick');return false;</xsl:attribute>
																		<xsl:attribute name="rel">
																			<!--<xsl:value-of select="$skuSetId" />_<xsl:value-of select="$selectedSKU" />-->
																			<xsl:value-of select="@attrvalueid" />
																		</xsl:attribute>
																		<xsl:element name="img">
																			<xsl:attribute name="src">
																				<xsl:value-of select="@swatchimg" />
																			</xsl:attribute>
																			<xsl:attribute name="alt"><xsl:value-of select="@swatchvalue" /></xsl:attribute>
																		</xsl:element>
																		<xsl:element name="span">
																			<xsl:attribute name="class">color</xsl:attribute>
																				<xsl:value-of select="@swatchvalue" />
																		</xsl:element>
																	</xsl:element>
																</xsl:element>
															</xsl:if>
														</xsl:for-each>
													</xsl:element>
													
												</div>
												<h5 id="steptwo"></h5>
											</div>

										</xsl:if>
										</div>
										</div>
										<div class="qty2"> 
										<xsl:choose>
											<xsl:when test="($skuType='sku' or $skuType='skuset' or $skuType='package') and ($prdTypeId != 6  or ($prdTypeId=6 and $iskiosk='1')) and $prdTypeId != 5 and $prdTypeId != 3">
											  	<xsl:if test="@priceincart='1'">
														<xsl:element name="a">
															<xsl:attribute name="name">spic</xsl:attribute>
															<xsl:attribute name="onclick">popOverlay('/office/supplies/StaplesSkuOverlayProductDisplay?langId=<xsl:value-of select="$xslLangId" />&amp;storeId=<xsl:value-of select="$xslStoreId" />&amp;productId=<xsl:value-of select="./@id" />&amp;catalogId=<xsl:value-of select="$xslCatalogId" />',4)</xsl:attribute>
															<xsl:attribute name="class">buttonLink</xsl:attribute>
															<xsl:attribute name="rel">nofollow</xsl:attribute>
															<xsl:element name="div">
																<xsl:attribute name="class">buttonLarge buttonPrimaryLarge</xsl:attribute>
																<xsl:attribute name="id">spic</xsl:attribute>
																<xsl:element name="span">
																	<xsl:attribute name="class">buttonText</xsl:attribute>
																	<xsl:value-of select="$label_seepriceincart"/>
																</xsl:element>
															</xsl:element>
														</xsl:element>
												</xsl:if>
													<xsl:element name="p">
														<xsl:attribute name="class">stockMessage hide</xsl:attribute>
														<xsl:attribute name="id">stockMessage</xsl:attribute>
														<xsl:value-of select="$label_outofstock"/>
													</xsl:element>
													<div class="cartActions">
													<xsl:if test="not(@priceincart='1')">
														<label for="itemQty"><xsl:value-of select="$label_qty"/><xsl:text> </xsl:text></label>
														<xsl:element name="input">
															<xsl:attribute name="type">text</xsl:attribute>
															<xsl:attribute name="name">quantity1_<xsl:value-of select="position()" /></xsl:attribute>
															<xsl:attribute name="id">skuitem<xsl:value-of select="@id" /></xsl:attribute>
															<xsl:attribute name="class">itemQty</xsl:attribute><xsl:attribute name="size">3</xsl:attribute>
															<xsl:attribute name="value">1</xsl:attribute>
															<xsl:attribute name="maxlength">3</xsl:attribute>
															<xsl:attribute name="onfocus">javascript:qtyOne(this);</xsl:attribute>
														</xsl:element>
													<xsl:element name="a">
															<xsl:attribute name="href">javascript:addToCartWithOverlay('','skuitem','<xsl:value-of 
																		 select="$skuWithSuffix" />','<xsl:value-of 
																		 select="@id" />', '')</xsl:attribute>
															<xsl:attribute name="name">btnMainAddToCart</xsl:attribute>
															<xsl:attribute name="class">buttonLink</xsl:attribute>
															<xsl:attribute name="rel">nofollow</xsl:attribute>
															<xsl:element name="div">
																<xsl:attribute name="class">buttonLarge buttonPrimaryLarge</xsl:attribute>
																<xsl:element name="span">
																	<xsl:attribute name="class">buttonText</xsl:attribute>
																	<xsl:value-of select="$label_addtocart"/>
																</xsl:element>
															</xsl:element>
													</xsl:element>
													<xsl:element name="a">
														<xsl:attribute name="href">#</xsl:attribute>
														<xsl:attribute name="onclick">popOverlay('/office/supplies/StaplesStoreInventory?catalogId=<xsl:value-of select="$xslCatalogId" />&amp;catentryId=<xsl:value-of select="@id" />&amp;skuPrice=<xsl:value-of select="format-number(number(price/@is),'$#0.00')" />&amp;langId=<xsl:value-of select="$xslLangId" />&amp;storeId=<xsl:value-of select="$xslStoreId" />', 3);return false;</xsl:attribute>
														<xsl:attribute name="class">buttonLink</xsl:attribute>
														<xsl:attribute name="rel">nofollow</xsl:attribute>													
													</xsl:element>
													
													</xsl:if>
													</div>
													<xsl:choose>
														<xsl:when test="$pageName = 'quickview'">
															<xsl:element name="input">
																<xsl:attribute name="type">hidden</xsl:attribute>
																<xsl:attribute name="name">quickview<xsl:value-of select="position()" /></xsl:attribute>
																<xsl:attribute name="id">overlayFlag</xsl:attribute>
																<xsl:attribute name="class">itemQty</xsl:attribute><xsl:attribute name="size">3</xsl:attribute>
																<xsl:attribute name="value">true</xsl:attribute>
															</xsl:element>
														</xsl:when>
													</xsl:choose>
													
													</xsl:when>
												<xsl:when test="$skuType = 'sku' and  $prdTypeId = 6 and $iskiosk!='1'">
												<p class="stockMessage" id="inStoreSpecial"><xsl:value-of select="$label_instorespecial"/>.</p>
													 
												</xsl:when>
												<xsl:when test="$skuType = 'sku' and  $prdTypeId = 5">
													<p class="stockMessage" id="availableInStore"><xsl:value-of select="$label_availableinstore"/>.</p>  
												</xsl:when>
												<xsl:when test="$skuType = 'sku' and  $prdTypeId = 3">
													<a href="{imgs/pic[@id='17']/@desturl}" class="buttonLink businessService"><div class="buttonLarge buttonPrimaryLarge"><span class="buttonText">Get Started</span></div></a>
												</xsl:when>
											</xsl:choose>
											<xsl:if test="($skuType = 'sku' or $skuType='package') and $prdTypeId != 3">
											<xsl:element name="p">
											 <xsl:attribute name="class">addFavorite</xsl:attribute>
												<xsl:element name="a">
													<xsl:attribute name="rel">nofollow</xsl:attribute>
													<xsl:attribute name="href">javascript:addSingleItemToFavorites('/office/supplies/StaplesAddToFavorite?catalogId=<xsl:value-of select="$xslCatalogId" />&amp;errorUrl=sku&amp;langId=<xsl:value-of select="$xslLangId" />&amp;productId=<xsl:value-of select="@id" />&amp;storeId=<xsl:value-of select="$xslStoreId" />&amp;ST_viewFrom=sku&amp;URL=yourorder', '<xsl:value-of select="@snum" />' ,  <xsl:value-of select="@id" />)</xsl:attribute>
													<xsl:attribute name="onclick">s_objectID=&quot;javascript:addSingleItemToFavorites('/office/supplies/StaplesAddToFavorite?_1&quot;;return this.s_oc?this.s_oc(e):true</xsl:attribute>
													<xsl:value-of select="$label_addtofavorites" />
												</xsl:element> 
											 </xsl:element>
											</xsl:if>
										</div>
										
										<xsl:if test="($presentationType = 'D')">
											
											<script type="text/javascript">
												//add the click event handling
												SWATCH.activateDropDown('.skuSelectControl .skuset_dropdown');
												
												var skuSelect = $(".skuSelectControl");
												STAPLES.SKU.enableDisableCart(skuSelect);
												$(".disabled a").bind("click",function(e){
													e.preventDefault();
												});
												
											</script>
										</xsl:if>

										<xsl:if test="($presentationType = 'S' or $presentationType = 'C')">	
											<xsl:if test="($skuType != 'sku' and $skuType!='package') or $prdTypeId = 3">
												<script type="text/javascript">
													STAPLES.SKU.enableDisableCartCollections(true);
													$(".disabled a").bind("click",function(e){
															e.preventDefault();
														});
												</script>
											</xsl:if>
										</xsl:if>
										<div class="ropsWrapper" id="ropsButton"></div>
										<div class="clearDiv"></div>

										<xsl:variable name="expandedCollapsed">
											<xsl:choose>
												<xsl:when test="@expandedPromo = '1'">
													<xsl:value-of select="string(' expanded')"/>
												</xsl:when>
												<xsl:otherwise>
													<xsl:value-of select="string(' collapsed')"/>
												</xsl:otherwise>
											</xsl:choose>
										</xsl:variable>

										<xsl:variable name="bmsmMs2">
											<xsl:for-each select="price/bmsm">
												<xsl:choose>
													<xsl:when
														test="number(@qmax) = 0 or number(@qmax)>=999 or number(@qmax)= -1">
														&lt;dd&gt;
														&lt;b&gt;
														&lt;i&gt;
														<xsl:value-of select="@qmin" />
														+ @
														<xsl:value-of select="format-number(number(@price),'$#0.00')" />
														&lt;/i&gt;
														&lt;/b&gt;
														&lt;/dd&gt;
													</xsl:when>
													<xsl:otherwise>
														&lt;dd&gt;
														<xsl:value-of select="@qmin" />
														-
														<xsl:value-of select="@qmax" />
														@
														<xsl:value-of select="format-number(number(@price),'$#0.00')" />
														&lt;/dd&gt;
													</xsl:otherwise>
												</xsl:choose>
											</xsl:for-each>
										</xsl:variable>
										<xsl:variable name="bmsmStr2">
											<xsl:if test="$bmsmMs2!='' and not(./@priceincart)">
												<xsl:element name="dd">
													<xsl:attribute name="class">bmsm skupflag</xsl:attribute>
													<xsl:choose>
														<xsl:when test="not(price/promo_text[@typeid='17'])">
															&lt;dt&gt;
															<xsl:choose>
																<xsl:when test="price/@bmsmpromo">
																	Buy More Save More
																</xsl:when>
																<xsl:otherwise>
																	<xsl:for-each select="price/promo_icon">
																		<xsl:value-of select="./@name" disable-output-escaping="yes" />
																	</xsl:for-each>
																</xsl:otherwise>
															</xsl:choose>
															&lt;/dt&gt;
														</xsl:when>
														<xsl:otherwise>
															&lt;dt&gt;Buy More Save More:&lt;/dt&gt;
														</xsl:otherwise>
													</xsl:choose>
													<xsl:value-of select="$bmsmMs2" />
												</xsl:element>
											</xsl:if>
										</xsl:variable>

										<xsl:choose>
											<xsl:when test="descs/desc[@typeid='41'] or descs/desc[@typeid='12'] or descs/desc[@typeid='17'] or descs/desc[@typeid='22'] or descs/desc[@typeid='35'] or price/freeitem">
												<div id="pdOfferZone" class="promoMessageWrapper">
													<xsl:element name="div">
														<xsl:attribute name="class">
															<xsl:value-of select="concat('promoMessage ',$expandedCollapsed)" />
														</xsl:attribute>
														<xsl:choose>
															<xsl:when test="price/promo_icon/@desturl">
																<!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																<div id="skuPromoZone">
																	<!-- End code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																	<h3 class="skupflag">
																		<xsl:for-each select="price/promo_icon">
																			<xsl:if test="normalize-space(.)"> <b><xsl:value-of select="./@name" disable-output-escaping="yes" /></b> 
																			</xsl:if>
																		</xsl:for-each>
																	</h3>
																	<!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																</div>
																<!-- end code change as part of Coupon creation based on customer segment.'Where' module implementation -->
															</xsl:when>
															<xsl:when test="not(price/promo_text) and $bmsmStr2!=''">
																<xsl:value-of select="$bmsmStr2" disable-output-escaping="yes"/>
															</xsl:when>

															<xsl:when test="descs/desc[@typeid='17']">
																<!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																<div id="skuPromoZone">
																	<!-- End code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																	<h3>

																		<xsl:value-of select="descs/desc[@typeid='17']" disable-output-escaping="yes" />

																	</h3>
																	<!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																</div>
																<!-- end code change as part of Coupon creation based on customer segment.'Where' module implementation -->
															</xsl:when>
															<xsl:when test="price/promo_icon ">
																<!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																<div id="skuPromoZone">
																	<!-- End code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																	<h3 class="skupflag">
																		<xsl:for-each select="price/promo_icon">
																			<xsl:if test="normalize-space(.)">
																				<xsl:value-of select="./@name" disable-output-escaping="yes" />
																			</xsl:if>
																		</xsl:for-each>
																	</h3>
																	<!-- Start code change as part of Coupon creation based on customer segment.'Where' module implementation -->
																</div>
																<!-- End code change as part of Coupon creation based on customer segment.'Where' module implementation -->
															</xsl:when>
														</xsl:choose>
														<div id="pdOfferZone" class="promoMessageBody">
															<!-- Promo Body-->
															<xsl:if test="descs/desc[@typeid='12']">
																<p>
																	<xsl:for-each select="descs/desc[@typeid='12']" >
																		<xsl:value-of select="." disable-output-escaping="yes" />
																		<xsl:text></xsl:text>
																		<!-- force a space between paragraphs-->
																	</xsl:for-each>
																</p>
															</xsl:if>
														</div>
														<!-- Only for in store delivery:Printable coupons-->
														<xsl:if test="descs/desc[@typeid='41']">
															<!-- Printable coupons-->
															<h4>
																<xsl:value-of select="descs/desc[@typeid='41']" disable-output-escaping="yes" />
															</h4>
														</xsl:if>
														<xsl:if test="descs/desc[@typeid='42']">
															<p class="printableCoupon">
																<xsl:element name="a">
																	<xsl:attribute name="href">
																		<xsl:value-of select="descs/desc[@typeid='42']" disable-output-escaping="yes" />
																	</xsl:attribute>
																	<xsl:attribute name="alt">
																		<xsl:value-of select="@name" disable-output-escaping="yes"/>
																		coupon
																	</xsl:attribute>
																	<xsl:value-of select="$label_printableCoupons" disable-output-escaping="yes" />
																</xsl:element>
															</p>
														</xsl:if>
														<div class="promoMessageBody">
															<xsl:for-each select="descs/desc[@typeid='22']" >
																<!-- Promo Terms and Conditions -->
																<h4>
																	<xsl:value-of select="." disable-output-escaping="yes" />
																	<xsl:text></xsl:text>
																</h4>
															</xsl:for-each>
														</div>
														<xsl:if test="descs/desc[@typeid='35']">
															<!-- Promo Offer Expires-->
															<h4>
																<xsl:value-of select="descs/desc[@typeid='35']" disable-output-escaping="yes" />
																<xsl:text></xsl:text>
															</h4>
														</xsl:if>
														<xsl:if test="descs/desc[@typeid='12'] or descs/desc[@typeid='22'] ">
															<!-- Promo expand collapse Link-->
															<xsl:element name="a">
																<xsl:attribute name="class">actionLink</xsl:attribute>
																<xsl:attribute name="href">javascript:void(0)</xsl:attribute>
																<xsl:attribute name="onclick">STAPLES.SKU.expandCollapsePromo(this)</xsl:attribute>
																<xsl:choose>
																	<xsl:when test="@expandedPromo = '1'">
																		<xsl:value-of select="$label_collapse"/>
																	</xsl:when>
																	<xsl:otherwise>
																		<xsl:value-of select="$label_seedetails"/>
																	</xsl:otherwise>
																</xsl:choose>
															</xsl:element>
														</xsl:if>
													</xsl:element>

													<xsl:if test="price/freeitem">
														<xsl:variable name="fsave">
															<xsl:value-of select="price/@fsave" />
														</xsl:variable>

														<!-- Free Item -->
														<xsl:for-each select="price/freeitem">
															<div class="bundleProduct">
																<a href="{producturl}">
																	<img alt="{./@name}" src="{./imgs}_sc7?$thb$" />
																</a>
																<p class="bundleValue highlight">
																	<xsl:value-of select="$label_free"/>
																	<xsl:value-of select="format-number(number($fsave),'$#0.00')" />
																	<xsl:value-of select="$label_value"/>
																</p>
																<p class="bundleName">
																	<xsl:value-of select="./@name" disable-output-escaping="yes"/>
																</p>
																<p class="bundleItem">
																	<xsl:value-of select="$label_item" />
																	:
																	<xsl:value-of select="./@snum" disable-output-escaping="yes" />
																	<br/>
																	<xsl:value-of select="$label_model" />
																	:
																	<xsl:value-of select="./@mnum" disable-output-escaping="yes" />
																</p>
															</div>

														</xsl:for-each>

													</xsl:if>
												</div>
											</xsl:when>
											<xsl:when test="price/promo_icon and not(price/bmsm or descs/desc[@typeid='41'] or descs/desc[@typeid='12'] or descs/desc[@typeid='17'] or descs/desc[@typeid='22'] or descs/desc[@typeid='35'] or price/freeitem)">
												<div class="promoMessageWrapper">
													<xsl:element name="div">
														<xsl:attribute name="class">
															<xsl:value-of select="concat('promoMessage ',$expandedCollapsed)" />
														</xsl:attribute>
														<h3 class="skupflag">
															<xsl:for-each select="price/promo_icon">
																<xsl:if test="normalize-space(.)"> <b><xsl:value-of select="./@name" disable-output-escaping="yes" /></b> 
																</xsl:if>
															</xsl:for-each>
														</h3>
													</xsl:element>
												</div>
											</xsl:when>
										</xsl:choose>



	</xsl:template>
			<!-- Xsl:template for displaying swatch when a sku is selected -->
		<xsl:template name="SwatchSelection">
		<xsl:param name="list" ></xsl:param>
		<xsl:variable name="newlist"> <xsl:value-of select="$list"/> </xsl:variable>
		
		<xsl:variable name="first">
			<xsl:choose>
				<xsl:when test="contains($newlist,'|')">
					<xsl:value-of select="substring-before($newlist,'|')"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$newlist"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="remaining" select="substring-after($newlist, '|')" />
     	<xsl:if test="@attrvalueid = $first">
			<xsl:attribute name="class"><xsl:value-of select="$label_selected" /></xsl:attribute>
		</xsl:if>
		<xsl:if test="$remaining">
         <xsl:call-template name="SwatchSelection">
          <xsl:with-param name="list" select="$remaining" ></xsl:with-param>
          </xsl:call-template>
          </xsl:if>
		</xsl:template>
</xsl:stylesheet> 