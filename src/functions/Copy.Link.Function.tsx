const Copy = (content: string): void => {
    window.navigator.clipboard.writeText(content as string);
}

export default Copy;