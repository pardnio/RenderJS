(() => {
  const list = [...document.querySelectorAll(".md-mermaid:not([data-rendered]) > pre.mermaid")];
  if (list.length === 0) return;

  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.tabIndex = -1;
  frame.style.cssText = "position:absolute;left:-10000px;top:0;width:1200px;height:800px;border:0;visibility:hidden";
  frame.srcdoc =
    `<!doctype html><html><head></head><body><script src="https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"><\/script>` +
    `<script>(async()=>{` +
    `mermaid.initialize({startOnLoad:false,theme:"default",securityLevel:"strict"});` +
    `const list=[...parent.document.querySelectorAll(".md-mermaid:not([data-rendered]) > pre.mermaid")];` +
    `for(const [i,e] of list.entries()){try{const {svg}=await mermaid.render("rjs-mermaid-"+i,e.textContent);e.innerHTML=svg;e.parentElement.setAttribute("data-rendered","")}catch(err){console.error("[Upstream] mermaid: "+err.message)}}` +
    `frameElement.remove();` +
    `})()<\/script></body></html>`;
  document.body.append(frame);
})();
