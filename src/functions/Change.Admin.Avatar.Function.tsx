const ChangeAdminAvatarFunction = (element: HTMLImageElement): void => {
    const currentAvatar: HTMLImageElement = window.document.querySelector("#current-admin-avatar-placeholder") as HTMLImageElement;
    currentAvatar.src = element.src;
    // make post request to server to update user profile avatar
}

export default ChangeAdminAvatarFunction;