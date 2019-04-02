#include <QtCore/QtCore>
#include <log/Logger.h>
#include "RootController.h"

using namespace Cutelyst;

RootController::RootController(QObject *parent) :
    Controller(parent)
{}

void RootController::index(Context *c)
{
    qCDebug(ROOT_CONTROLLER) << "Reached homepage handler";
    auto response = c->response();
    auto uri = c->uriFor("/static/index.html");

    qCDebug(ROOT_CONTROLLER) << "Redirect URI: " << uri;
    response->redirect(uri);
    response->setStatus(200);
    response->headers().setHeader(
        QStringLiteral("LOCATION"),
        QString::fromLatin1(c->uriFor().toEncoded(QUrl::FullyEncoded))
    );

    qCDebug(ROOT_CONTROLLER) << "Response object header: "
                             << response->headers();
    qCDebug(ROOT_CONTROLLER) << "Response object body: "
                             << response->body();
}

void RootController::defaultPage(Context *c)
{
    c->response()->body() = "Page not found!";
    c->response()->setStatus(404);
}

