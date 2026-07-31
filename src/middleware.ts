import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const host = context.request.headers.get('host') || '';
  const url = new URL(context.request.url);

  // Subdomain Host Routing
  if (host.includes('manage.niengineeringbd.com')) {
    if (url.pathname === '/' || url.pathname === '/admin') {
      return context.rewrite('/subdomains/manage/');
    }
  } else if (host.includes('api.niengineeringbd.com')) {
    if (url.pathname === '/') {
      return context.rewrite('/subdomains/api/');
    }
  } else if (host.includes('shop.niengineeringbd.com')) {
    if (url.pathname === '/') {
      return context.rewrite('/subdomains/shop/');
    }
  } else if (host.includes('portal.niengineeringbd.com')) {
    if (url.pathname === '/') {
      return context.rewrite('/subdomains/portal/');
    }
  } else if (host.includes('erp.niengineeringbd.com')) {
    if (url.pathname === '/') {
      return context.rewrite('/subdomains/erp/');
    }
  }

  return next();
};
