#include <QtCore/QtCore>
#include "RootController.h"

using namespace Cutelyst;

RootController::RootController(QObject *parent) : Controller(parent)
{}

RootController::~RootController()
{}

void RootController::index(Context *c)
{
    auto response = c->response();
    response->redirect(c->uriFor("/static/index.html"));
    response->setStatus(200);
    response->headers().setHeader(
        QStringLiteral("LOCATION"),
        QString::fromLatin1(c->uriFor().toEncoded(QUrl::FullyEncoded))
    );
}

void RootController::defaultPage(Context *c)
{
    c->response()->body() = "Page not found!";
    c->response()->setStatus(404);
}

