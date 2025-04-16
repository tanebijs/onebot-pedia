import{_ as a,c as i,o as t,ae as e}from"./chunks/framework.CgMrDesg.js";const E=JSON.parse('{"title":"消息","description":"","frontmatter":{},"headers":[],"relativePath":"message/index.md","filePath":"message/index.md"}'),n={name:"message/index.md"};function p(l,s,d,h,o,k){return t(),i("div",null,s[0]||(s[0]=[e(`<h1 id="消息" tabindex="-1">消息 <a class="header-anchor" href="#消息" aria-label="Permalink to &quot;消息&quot;">​</a></h1><p>消息是 OneBot 11 标准中一个重要的数据类型，在发送消息的 API 和接收消息的事件中都有相关字段。OneBot 11 规定了消息的两种表示形式：字符串（string）格式和数组（array）格式。</p><h2 id="基础概念" tabindex="-1">基础概念 <a class="header-anchor" href="#基础概念" aria-label="Permalink to &quot;基础概念&quot;">​</a></h2><p>消息的基本构成单位是消息段，有不同的<strong>类型</strong>（type，OneBot 11 称之为功能名），并且每个类型都有自己特有的<strong>数据</strong>（data，OneBot 11 称之为参数），遵循键-值对的形式。消息段的类型和数据共同构成了消息段的内容。</p><p>例如，文本（text）类型的数据有一个键值对，键为 <code>text</code>，值为文本内容，用 JSON 格式表示如下：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, world!&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="字符串表示" tabindex="-1">字符串表示 <a class="header-anchor" href="#字符串表示" aria-label="Permalink to &quot;字符串表示&quot;">​</a></h2><p>消息的字符串格式脱胎自 CQ 码，除文本外，其他类型的消息段都用一对方括号 <code>[]</code> 包裹起来，基本格式为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[CQ:类型,参数1=值1,参数2=值2,...]</span></span></code></pre></div><p>CQ 码中不应有多余的空格，例如不应该使用 <code>[CQ:face, id=178]</code>。</p><p>CQ 码的参数值可以包含空格、换行、除 <code>[],&amp;</code> 之外的特殊符号等。在解析时，应直接取 <code>[CQ:</code> 后、第一个 <code>,</code> 或 <code>]</code> 前的部分为功能名，第一个 <code>,</code> 之后到 <code>]</code> 之间的部分为参数，按 <code>,</code> 分割后，每个部分第一个 <code>=</code> 前的内容为参数名，之后的部分为参数值。例如 <code>[CQ:share,title=标题中有=等号,url=http://baidu.com]</code> 中，功能名为 <code>share</code>，<code>title</code> 参数值为 <code>标题中有=等号</code>，<code>url</code> 参数值为 <code>http://baidu.com</code>。</p><details class="details custom-block"><summary>一点碎碎念</summary><p>遗憾的是，CQ 码这样的编码格式被<strong>严重滥用</strong>了，很多开发者（尤其是易语言开发者）完全没有按照上面的逻辑去解析 CQ 码，造成了很大的适配困难。比如，<code>at</code> 的参数只包含一个字段 <code>qq</code>，因此其标准的 CQ 码格式应该形如 <code>[CQ:at,qq=123]</code>，因此一些开发者通过搜索 <code>[CQ:at,qq=</code> 的结束位置和 <code>]</code> 的开始位置，然后取二者之间的内容作为被 at 的 QQ 号。NapCatQQ 曾经为 <code>at</code> 增加了一个扩展字段 <code>name</code>，这样编码而成的 CQ 码就变成了 <code>[CQ:at,qq=123,name=小明]</code>，这样通过上面方式解析就会得到 <code>123,name=小明</code>，而不是 <code>123</code>。NapCatQQ 后续被迫回滚了这个功能。</p></details><h3 id="转义" tabindex="-1">转义 <a class="header-anchor" href="#转义" aria-label="Permalink to &quot;转义&quot;">​</a></h3><p>CQ 码中包含一些特殊字符：<code>[</code>、<code>]</code>、<code>,</code> 等，而 CQ 码又是可能混杂在纯文本内容之中的，因此消息中的纯文本内容需要对特殊字符进行转义，以避免歧义。具体的转义规则如下：</p><table tabindex="0"><thead><tr><th>转义前</th><th>转义后</th></tr></thead><tbody><tr><td><code>&amp;</code></td><td><code>&amp;amp;</code></td></tr><tr><td><code>[</code></td><td><code>&amp;#91;</code></td></tr><tr><td><code>]</code></td><td><code>&amp;#93;</code></td></tr></tbody></table><p>例如，一个纯文本消息转义前内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- [x] 使用 \`&amp;data\` 获取地址</span></span></code></pre></div><p>转义后如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- &amp;#91;x&amp;#93; 使用 \`&amp;amp;data\` 获取地址</span></span></code></pre></div><p>另一方面，CQ 码内部的参数值也可能出现特殊字符，也是需要转义的。由于 <code>,</code>（半角逗号）在 CQ 码中用于分隔参数，因此除了上面的转义规则，还需要对 <code>,</code> 进行转义，如下：</p><table tabindex="0"><thead><tr><th>转义前</th><th>转义后</th></tr></thead><tbody><tr><td><code>&amp;</code></td><td><code>&amp;amp;</code></td></tr><tr><td><code>[</code></td><td><code>&amp;#91;</code></td></tr><tr><td><code>]</code></td><td><code>&amp;#93;</code></td></tr><tr><td><code>,</code></td><td><code>&amp;#44;</code></td></tr></tbody></table><h2 id="数组表示" tabindex="-1">数组表示 <a class="header-anchor" href="#数组表示" aria-label="Permalink to &quot;数组表示&quot;">​</a></h2><p>数组格式将消息表示为一系列消息段对象的数组，在基本语义上与字符串格式等价，可以相互转换，但数组格式的表达能力更强，例如可以嵌套、规定参数数据类型等。用 JSON 表示的一个消息段基本格式如下：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;类型&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;参数1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;值1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;参数2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;值2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;...&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>这与上面的示例 CQ 码等价。</p><p>因此，将一个个 JSON 表示的消息段拼合起来，就可以得到一个完整的消息段数组，例如，CQ 码为</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Hello, world![CQ:face,id=178][CQ:at,qq=123456789]</span></span></code></pre></div><p>的一条消息，用数组格式表示就是：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, world!&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;face&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">178</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;at&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;qq&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123456789</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><details class="details custom-block"><summary>最佳实践</summary><p>在条件允许的情况下，我们更推荐使用数组格式来表示消息段，因为它的表达能力更强，且更易于解析。<strong>并且，协议端对数组格式的支持也更加完善。</strong></p></details>`,30)]))}const r=a(n,[["render",p]]);export{E as __pageData,r as default};
