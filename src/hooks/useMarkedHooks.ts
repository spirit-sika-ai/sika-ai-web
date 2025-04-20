import {ref, watch} from 'vue'
import {Marked} from "marked";
import {debounce} from "lodash";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';

const marked = new Marked()

marked.use({
  async: false,      // 异步渲染, 考虑在worker中处理
  breaks: true,      //单个换行符上添加 <br>
  pedantic: false,   // 尽可能兼容Markdown.pl的输出
  gfm: true,         // 标注md规范, https://github.github.com/gfm/
})

marked.use(markedHighlight({
  emptyLangClass: 'hljs',
  langPrefix: 'hljs language-',
  highlight(code, lang, _) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, {language}).value;
  }
}));

export const useMarkedHooks = () => {
  // 原始md字符串
  const mdStr = ref<string>('')
  // 解析后的html文本, 需要依靠highlight做代码高亮, 与第三方css库美化样式, 要优化样式或许要自定义render
  const htmlStr = ref<string>('')
  watch(mdStr, debounce((newVal) => {
    const parsed = marked.parse(newVal)
    if (parsed instanceof Promise) {
      parsed.then(res => {
        htmlStr.value = res
      })
    } else {
      htmlStr.value = parsed
    }
  }, 300))

  return {
    marked,
    mdStr,
    htmlStr
  }

}