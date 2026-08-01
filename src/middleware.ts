import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const host = context.request.headers.get('host') || '';
  const url = new URL(context.request.url);

  // Subdomain Host Routing
  if (host.startsWith('manage.')) {
    if (url.pathname === '/' || url.pathname === '/admin') {
      return context.rewrite('/subdomains/manage/');
    }
  } else if (host.startsWith('api.')) {
    if (url.pathname === '/') {
      return context.rewrite('/subdomains/api/');
    }
  } else if (host.startsWith('shop.')) {
    if (url.pathname === '/') {
      return context.rewrite('/subdomains/shop/');
    }
  } else if (host.startsWith('portal.')) {
    if (url.pathname === '/') {
      return context.rewrite('/subdomains/portal/');
    }
  } else if (host.startsWith('erp.')) {
    if (url.pathname === '/') {
      return context.rewrite('/subdomains/erp/');
    }
  }

  return next();
};
