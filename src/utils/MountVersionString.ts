class MountVersionString {
  public mount(routhPath: string) {
    const VERSION = 'v1';

    return `/api/${VERSION}/${routhPath}`;
  }
}

export default new MountVersionString();
