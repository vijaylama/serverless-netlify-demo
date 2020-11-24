module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css")
  eleventyConfig.addPassthroughCopy("src/images/")
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setTemplateFormats("html,njk");

  // Input directory: src
  // Output directory: _site
  return {
    dir: {
      input: "src"
    }
  }
}
