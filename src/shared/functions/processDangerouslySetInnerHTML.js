const processDangerouslySetInnerHTML = (htmlElement="") => {
    const processHtmlElement = htmlElement.replace(/<p[^>]*style="[^"]*font-size[^"]*"[^>]*><\/p>/g, '<p>&nbsp;</p>')
    return processHtmlElement
}


export default processDangerouslySetInnerHTML