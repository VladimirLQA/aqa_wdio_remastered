declare namespace WebdriverIO {
    interface Element {
      toHaveInputBorder(options: { mode: 'dark' | 'light', type: 'valid' | 'invalid' }): Promise<void>
    }
}
