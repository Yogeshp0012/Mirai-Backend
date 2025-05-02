import logger from 'morgan';

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
};

logger.token('colored-status', (req, res) => {
  const status = res.statusCode;
  let color;
  if (status >= 500) color = colors.red;
  else if (status >= 400) color = colors.yellow;
  else if (status >= 300) color = colors.cyan;
  else color = colors.green;

  return color + status + colors.reset;
});

logger.token('short-date', () => {
  const now = new Date();
  return now.toLocaleString('sv').replace(',', '');
});

logger.token('bytes-sent', (req, res) => {
  let length =
    res.getHeader('X-Original-Content-Length') ||
    res.get('x-content-length') ||
    res.getHeader('Content-Length');

  if (!length && res.locals && res.locals.stat) {
    length = res.locals.stat.size;
  }

  if (!length && res._contentLength) {
    length = res._contentLength;
  }

  if (length && Number.isNaN(Number(length)) === false) {
    return `${(parseInt(length, 10) / 1024).toFixed(2)}KB`;
  }

  const transferEncoding = res.getHeader('Transfer-Encoding');
  if (transferEncoding === 'chunked') {
    return 'chunked';
  }

  return '-';
});

logger.token('transfer-state', (req, res) => {
  if (!res._header) return 'NO_RESPONSE';
  if (res.finished) return 'COMPLETE';
  return 'PARTIAL';
});

const getMorganFormat = () =>
  ':short-date :method :url :colored-status :response-time[0]ms :bytes-sent :transfer-state :remote-addr';

const morganFormat = getMorganFormat();

const captureContentLength = (req, res, next) => {
  const originalWrite = res.write;
  const originalEnd = res.end;
  let length = 0;

  res.write = (...args) => {
    const [chunk] = args;
    if (chunk) {
      length += chunk.length;
    }
    return originalWrite.apply(res, args);
  };

  res.end = (...args) => {
    const [chunk] = args;
    if (chunk) {
      length += chunk.length;
    }
    if (length > 0) {
      res._contentLength = length;
    }
    return originalEnd.apply(res, args);
  };

  next();
};

export const morganLogger = () => (req, res, next) => {
  captureContentLength(req, res, () => {
    logger(morganFormat, {
      immediate: false,
    })(req, res, next);
  });
};

export const _getMorganFormat = getMorganFormat;
