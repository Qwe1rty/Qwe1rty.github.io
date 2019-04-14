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
    auto uri = c->uriFor("index.html");

    qCInfo(ROOT_CONTROLLER) << "Redirecting to URL: " << uri;
    response->redirect(uri);

    qCDebug(ROOT_CONTROLLER) << "Response object header: "
                             << response->headers();
}

void RootController::defaultPage(Context *c)
{
    c->response()->body() = "Page not found!";
    c->response()->setStatus(404);
}

