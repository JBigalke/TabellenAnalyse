<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="html" version="4.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
        <html>
            <head>
                <title>SAL5066</title>
                <link rel="stylesheet" href="SAL.css"/>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>
                <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
                <!-- <script src="SAL.js"/> -->
                <script src="SAL2.js"/>
                <script src="detailedit.js"/>
                <script src="annotation.js"></script>
            </head>
            <body>
        <xsl:apply-templates/>  
            </body>
            <div class="annotate-dialog" title='Annotation'>
                <p id="annotierstring"></p>
                <p class="tagnamep"><span>Tag-Name:</span><input class="tagnameinput" type="text" /></p>
                <p class="attributesp">
                    <p class="attributeslabel">Attributes:</p>
                    <button class="addattributebutton" name="addattribute">Add</button>
                </p>
                
            </div>
        </html>
    </xsl:template>
    
    <xsl:template match="tei:teiHeader"/>
    
    <xsl:template match="tei:body">
        <div id="leftcontent">
        <xsl:for-each select=".//*">
            <xsl:choose>
                <xsl:when test=".[name() = 'pb']">
                    <xsl:element name="hr">
                        <xsl:attribute name="id" select="concat('page_', ./@n)"/>
                        <xsl:attribute name="class">pageheadline</xsl:attribute>
                        <xsl:attribute name="data-page-nr" select="./@n"/>
                        <xsl:value-of select="./@n"/>
                    </xsl:element>
                </xsl:when>
                <xsl:when test=".[name() = 'p']">
                    <xsl:variable name="pagenumber" select="preceding-sibling::tei:pb[1]/@n"/>
                    <xsl:element name="div">
                        <xsl:attribute name="id"
                            select="concat('p', $pagenumber, '_d', position() - $pagenumber)"/>
                        <xsl:attribute name="class">Textregion</xsl:attribute>
                        <xsl:for-each select="./tei:lb">
                            <xsl:element name="p">
                                <xsl:attribute name="class">textline</xsl:attribute>
                                <xsl:attribute name="id" select="./@xml:id"/>
                                <xsl:attribute name="data-linenr" select="./@n"/>
                                <xsl:element name="span">
                                    <xsl:value-of select="preceding-sibling::text()[1]"/>
                                </xsl:element>
                                <xsl:element name="input">
                                    <xsl:attribute name="type">checkbox</xsl:attribute>
                                    <xsl:attribute name="class">linecheckbox</xsl:attribute>
                                    <xsl:attribute name="data-ref" select="./@xml:id"/>
                                </xsl:element>
                            </xsl:element>
                        </xsl:for-each>
                        
                        <xsl:element name="button">
                            <xsl:attribute name="class">moveupbutton</xsl:attribute>
                            <xsl:attribute name="name">moveup</xsl:attribute>↑</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">newregionbutton</xsl:attribute>
                            <xsl:attribute name="name">newregion</xsl:attribute> new</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">movedownbutton</xsl:attribute>
                            <xsl:attribute name="name">movedown</xsl:attribute>↓</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">editbutton</xsl:attribute>
                            <xsl:attribute name="name">edit</xsl:attribute>edit</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">annotateregionbutton</xsl:attribute>
                            <xsl:attribute name="name">annotateregion</xsl:attribute>Annotate</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">removeregionbutton</xsl:attribute>
                            <xsl:attribute name="name">removeregion</xsl:attribute>X</xsl:element>
                    </xsl:element>
                </xsl:when>
                <xsl:when test=".[name() = 'table']">
                    <xsl:variable name="pagenumber" select="preceding-sibling::tei:pb[1]/@n"/>
                    <xsl:element name="div">
                        <xsl:attribute name="id"
                            select="concat('p', $pagenumber, '_d', position() - $pagenumber)"/>
                        <xsl:attribute name="class">tableregion</xsl:attribute>
                        <table>
                            <xsl:attribute name="class">texttable</xsl:attribute>
                        <xsl:apply-templates/>
                        </table>
                        <xsl:element name="button">
                            <xsl:attribute name="class">moveupbutton</xsl:attribute>
                            <xsl:attribute name="name">moveup</xsl:attribute>↑</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">newregionbutton</xsl:attribute>
                            <xsl:attribute name="name">newregion</xsl:attribute> new</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">movedownbutton</xsl:attribute>
                            <xsl:attribute name="name">movedown</xsl:attribute>↓</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">editbutton</xsl:attribute>
                            <xsl:attribute name="name">edit</xsl:attribute>edit</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">annotateregionbutton</xsl:attribute>
                            <xsl:attribute name="name">annotateregion</xsl:attribute>Annotate</xsl:element>
                        <xsl:element name="button">
                            <xsl:attribute name="class">removeregionbutton</xsl:attribute>
                            <xsl:attribute name="name">removeregion</xsl:attribute>X</xsl:element>
                    </xsl:element>
                </xsl:when>
            </xsl:choose>
            
        </xsl:for-each>
        </div>
        <div id="rightcontent">
            <xsl:element name="div">
                <xsl:attribute name="class">imagediv</xsl:attribute>
                <xsl:attribute name="data-actual-page-nr">1</xsl:attribute>
                <xsl:element name="img">
                    <xsl:attribute name="class">pageimages</xsl:attribute>
                    <xsl:attribute name="src">../../Images/Originals/SAL5066_0001.jpg</xsl:attribute>    
                </xsl:element>
            </xsl:element>
            
            <xsl:element name="div">
                <xsl:attribute name="class">pdfdiv</xsl:attribute>
                <xsl:element name="object">
                    <xsl:attribute name="class">idpdf</xsl:attribute>
                    <xsl:attribute name="data">/media/jan/Extern/SAL5066/pdf/SAL5066IDs.pdf</xsl:attribute>
                </xsl:element>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">imagemenue</xsl:attribute>
                <xsl:element name="button">
                    <xsl:attribute name="class">previmagebutton</xsl:attribute>←</xsl:element>
                <xsl:element name="button">
                    <xsl:attribute name="class">nextimagebutton</xsl:attribute>→</xsl:element>
                <xsl:element name="button">
                    <xsl:attribute name="class">toggleimagebutton</xsl:attribute>toggle</xsl:element>
            </xsl:element>
            
        </div>
    </xsl:template>
    
    
    
    
    <xsl:template match="tei:table">
        <xsl:element name="table">
            <xsl:attribute name="class">texttable</xsl:attribute>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="tei:pb">
        <xsl:element name="p">
            <xsl:attribute name="style">border-bottom: 1px dotted black;</xsl:attribute>
            <xsl:value-of select="./@n"/>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="tei:p">

    </xsl:template>
    
    
    <xsl:template match="tei:row">
        <xsl:element name="tr">
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="tei:cell">
        <xsl:element name="td">
            <xsl:element name="p">
                <xsl:attribute name="class">textline</xsl:attribute>
                <xsl:attribute name="id" select="./@xml:id"/>
                <xsl:attribute name="data-linenr" select="./@n"/>
                <xsl:element name="span">
                    <xsl:value-of select="."/>
                </xsl:element>
                <xsl:element name="input">
                    <xsl:attribute name="type">checkbox</xsl:attribute>
                    <xsl:attribute name="class">linecheckbox</xsl:attribute>
                    <xsl:attribute name="data-ref" select="./@xml:id"/>
                </xsl:element>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="text()"/>
</xsl:stylesheet>