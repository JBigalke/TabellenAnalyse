<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:exsl="http://exslt.org/common"
    xmlns:pxml="http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15"
    exclude-result-prefixes="xs" version="2.0" extension-element-prefixes="exsl">
    <xml:namespace prefix="pxml"
        ns="http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15"/>

    <xsl:variable name="lines" select="document('params.xml')"/>


    <xsl:template match="pxml:TextLine">
        <xsl:copy>
        <xsl:apply-templates select="@* | *"/> 
        <xsl:variable name="id" select="string(./@id)"/>
            <xsl:variable name="baselinepoints" select="./pxml:Baseline/@points"/>
            <xsl:if test="$lines//line[@id = $id]">
            <xsl:element name="TextEquiv" namespace="http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15">
                <xsl:element name="Unicode" namespace="http://schema.primaresearch.org/PAGE/gts/pagecontent/2013-07-15"><xsl:value-of select="$lines//line[@id = $id]"/></xsl:element>
            </xsl:element>
            </xsl:if>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>



</xsl:stylesheet>
