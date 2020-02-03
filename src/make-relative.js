const { relative, dirname } = require(`path`)
const getConfig = require(`./get-config`)
const slash = require(`slash`)

const cwd = process.cwd()

module.exports = async (markdownPath, imagePath, options) => {
	const { mediaPath, publicPath } = await getConfig(options)
	const mediaSlashPath = '/' + mediaPath + '/';
	if(
		typeof imagePath !== `string` ||
		imagePath.indexOf(mediaSlashPath) !== 0
	){
		return imagePath
	}

	const mediaStartSlashPath = '/' + mediaPath
	markdownPath = dirname(markdownPath).replace(cwd + "/", "");
	imagePath = imagePath.replace(mediaStartSlashPath, publicPath).substring(1);
	const newPath = relative(markdownPath, imagePath);
	return slash(newPath)
}
