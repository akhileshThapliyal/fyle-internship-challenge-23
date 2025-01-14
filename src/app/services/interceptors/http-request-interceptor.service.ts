import {Injectable} from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {HttpCacheService} from '../http-cache.service';
import {Observable, of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';

/**
 * Intercept all http requests
 * @class {HttpRequestInterceptor}
 */
@Injectable({
	providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpRequestInterceptor {

	constructor(
		private _cache: HttpCacheService
	) {}

	/**
	 * When an http request starts, set loading to true. When the request is finished, set loading to false.
	 * If an error is thrown be sure loading is set to false.
	 * @param {HttpRequest} request
	 * @param {HttpHandler} next
	 * @returns {Observable<HttpEvent<any>>}
	 */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let cachedResponse: HttpResponse<any> | null = new HttpResponse<any>();
		if (request.method === 'GET') {
			cachedResponse = this._cache.get(request);
			if (cachedResponse) {
				console.debug(`[HttpRequestInterceptor.intercept] Response from cache for ${request.urlWithParams}`, cachedResponse);
			}
		}else if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH' || request.method === 'DELETE') {
			const removedFromCache = this._cache.delete(request);
			if (removedFromCache) {
				console.debug(`[HttpRequestInterceptor.intercept] Cleared ${request.urlWithParams} from the cache`);
			}
		}
		return next.handle(request)
			.pipe(
				tap<HttpEvent<any>>((httpEvent: HttpEvent<any>) => {
					if (httpEvent instanceof HttpResponse) {
						this._cache.put(request, httpEvent);
					}
					return cachedResponse ? cachedResponse : httpEvent;
				}),
				catchError((err: HttpErrorResponse) => {
					throw err;
				}),
				finalize(() => {
					
				})
			);
	}
}