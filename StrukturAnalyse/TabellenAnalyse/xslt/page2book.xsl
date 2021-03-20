<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
    exclude-result-prefixes="xs" version="2.0">
    <xsl:variable name="pages" select="collection('../normalize/originals?select=*.xml')"/>

    <xsl:template match="/">
        <xsl:variable name="datensatz"
            select="tokenize(tokenize(base-uri($pages[1]), '/')[last()], '_')[1]"/>
        <TEI xmlns="http://www.tei-c.org/ns/1.0">
            <teiHeader>
                <fileDesc>
                    <titleStmt>
                        <title>TEI of <xsl:value-of select="$datensatz"/></title>
                    </titleStmt>
                    <publicationStmt>
                        <p>not published</p>
                    </publicationStmt>
                    <sourceDesc>
                        <p>Analyse von 2 Seiten von SAL5066 für demonstrationszwecken </p>
                    </sourceDesc>
                </fileDesc>
            </teiHeader>
            <text>
                <body>
                    <xsl:apply-templates/>
                </body>
            </text>
        </TEI>
    </xsl:template>

    <xsl:template match="pb">
        <pb xmlns="http://www.tei-c.org/ns/1.0" n="{./@n}"/>
    </xsl:template>

    <xsl:template match="div">
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="p">
        <p xmlns="http://www.tei-c.org/ns/1.0">
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="l">
        <xsl:variable name="id" select="./@xml:id"/>
        <lb xmlns="http://www.tei-c.org/ns/1.0"/>
        <xsl:value-of select="$pages//*[@id = $id]"/>
    </xsl:template>

    <xsl:template match="table">
        <tabel xmlns="http://www.tei-c.org/ns/1.0">
            <xsl:apply-templates/>
        </tabel>
    </xsl:template>

    <xsl:template match="row">
        <row xmlns="http://www.tei-c.org/ns/1.0">
            <xsl:apply-templates/>
        </row>
    </xsl:template>

    <xsl:template match="cell">
        <xsl:variable name="id" select="./@xml:id"/>
        <cell xmlns="http://www.tei-c.org/ns/1.0">
            <xsl:value-of select="$pages//*[@id = $id]"/>
        </cell>
    </xsl:template>

</xsl:stylesheet>
