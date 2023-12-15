export const markdownDocs = `<article>
<div>
    <h1 class="h3">Markdown cheatsheet</h1>
    <table class="ntable mtable cheatsheet">
<thead>
<tr class="text-center">
<th class="bg-transparent">What you type</th>
<th class="bg-transparent">What will be published</th>
</tr>
</thead>
<tbody>
<tr>
<td>
# Header 1<br>
## Header 2<br><br>
<span class="text-muted">And so on up to 6.</span>
</td>
<td>

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5


</td>
</tr>
<tr>
<td>
<span class="text-muted">Return once starts a new line.<br>Return twice (blank line) starts a new paragraph.</span><br>
</td>
<td></td>
</tr>
<tr>
<td>
*Italics*<br>
**Bold**<br>
~~Strikeout~~<br>
==Mark==
</td>
<td>
<i>Italics</i><br>
<b>Bold</b><br>
<del>Strikeout</del><br>
<mark>Mark</mark>
</td>
</tr>
<tr>
<td>
[TOC]<br><br>
<span class="text-muted">Generates Table of Contents from #&nbsp;Headers.<br>
    [TOC2] - From h2 to h6.<br>
    [TOC3] - From h3 to h6, and so on up to 6.
</span>
</td>
<td>
<div class="toc">
    <ol>
        <li><a href="#header-1">Header 1</a>
            <ol>
                <li><a href="#header-2">Header 2</a></li>
                <li><a href="#another-2">Another 2</a></li>
            </ol>
        </li>
        <li><a href="#another-1">Another 1</a></li>
    </ol>
</div>
</td>
</tr>
<tr>
<td>
- Bulleted list item a<br>
- Bulleted list item b<br>
&nbsp;&nbsp;&nbsp;&nbsp;- Nested item b1<br><br>
<span class="text-muted">Nested lists use 4 spaces or 1 tab.</span><br><br>
<span class="text-muted">An asterisk (*) can be used instead of a dash.</span>
</td>
<td>

<ul>
    <li class="mt-0">Bulleted list item a</li>
    <li>Bulleted list item b<ul>
            <li>Nested item b1</li>
        </ul>
    </li>
</ul>
</td>
</tr>
<tr>
<td>
1. Numbered list item<br>
2. Numbered list item<br>
&nbsp;&nbsp;&nbsp;&nbsp;1. Nested list item<br>
&nbsp;&nbsp;&nbsp;&nbsp;2. Nested list item
</td>
<td>
<ol>
    <li class="mt-0">Numbered list item</li>
    <li>Numbered list item<ol>
            <li>Nested list item</li>
            <li>Nested list item</li>
        </ol>
    </li>
</ol>
</td>
</tr>
<tr>
<td>
- [ ] Checkbox 1<br>
- [x] Checkbox 2<br>
</td>
<td>
<ul class="task-list">
    <li class="mt-0"><input type="checkbox" disabled=""> Checkbox 1</li>
    <li><input type="checkbox" disabled="" checked=""> Checkbox 2</li>
</ul>
</td>
</tr>
<tr>
<td>
&gt;&gt; How to use quotes in Markdown?<br>
&gt; Just prepend text with &gt;
</td>
<td>
<blockquote>
    <blockquote>
        <p>How to use quotes in Markdown?</p>
    </blockquote>
    <p>Just prepend text with &gt;</p>
</blockquote>
</td>
</tr>
<tr>
<td>
${"```"} python<br>
s = "Tripple backticks ( ${"```"} ) generate code block"<br>
print(s)<br>
${"```"}<br><br>
<span class="text-muted">For the list of supported languages see <a href="/page/langs">the langs page</a>.</span>
</td>
<td>
<table class="highlighttable mt-0">
    <tbody>
        <tr>
            <td class="linenos border-0 p-0">
                <div class="linenodiv">
                    <pre><a href="#L-1-1">1</a><br><a href="#L-1-2">2</a></pre>
                </div>
            </td>
            <td class="code border-0 p-0">
                <div class="highlight">
                    <pre><span id="L-1-1"><a name="L-1-1"></a><span class="n">s</span> <span class="o">=</span><span class="s2">"Tripple backticks ( ${"```"} ) generate code block"</span></span><br><span id="L-1-2"><a name="L-1-2"></a><span class="k">print</span><span class="p">(</span><span class="n">s</span><span class="p">)</span></span></pre>
                </div>
            </td>
        </tr>
    </tbody>
</table>
</td>
</tr>
<tr>
<td>
Single backtick generates ${"`"}inline code${"`"}
</td>
<td>
Single backtick generates <code>inline code</code>
</td>
</tr>
<tr>
<td>
***<br><br>
<span class="text-muted">Horizontal rule, &lt;hr&gt;</span>
</td>
<td>
<hr>
</td>
</tr>
<tr>
<td>
\*not italics\*<br><br>
<span class="text-muted">To produce a literal asterisk or any symbol used in Markdown, use backslash to escape it.</span>
</td>
<td>
*not italics*
</td>
</tr>
<tr>
<td>
<pre class="p-0 text-reset" style="line-height: 1.5; font-size: 16px">Header | Header
------ | ------
Cell   | Cell
Cell   | Cell</pre>
<br><span class="text-muted">Columns can be aligned to the right with <code>--:</code> and centered with <code>:--:</code>.</span><br><br>
<pre class="p-0 text-reset" style="line-height: 1.5; font-size: 16px">Center | Right
:----: | ----:
Cell   | Cell
Cell   | Cell</pre>
</td>
<td>
<table class="ntable">
    <thead>
        <tr>
            <th>Header</th>
            <th>Header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell</td>
            <td>Cell</td>
        </tr>
        <tr>
            <td>Cell</td>
            <td>Cell</td>
        </tr>
    </tbody>
</table>
<br><br>

Center | Right
:----: | ----:
Cell   | Cell
Cell   | Cell

</tr>

<tr>
<td>
Autolinks:<br>
https://website.co/
</td>
<td>
Autolinks:<br>
<a href="https://website.co/">https://website.co/</a>
</td>
</tr>
<tr>
<td>
Link description:<br>
[Markdown pastebin](https://website.co)<br><br>
<span class="text-muted">Be sure to include the "http(s)://" part of the link.</span>
</td>
<td>
Link description:<br>
<a href="https://website.co">Markdown pastebin</a><br>
</td>
</tr>
<tr>
<td>
![Image description](https://i.imgur.com/PYV4crq.png)<br><br>
<span class="text-muted">Be sure to include direct link to the image.</span>
</td>
<td>

![Image description](https://i.imgur.com/PYV4crq.png)

</td>
</tr>
</tbody>
</table>

</div>
</article>`;
