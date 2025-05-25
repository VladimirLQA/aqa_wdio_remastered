import Logger from 'logger-vlaqa';

export default Logger.getInstance({
  colorize: !process.env.CI,
});
