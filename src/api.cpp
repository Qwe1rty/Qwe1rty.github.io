#include "api.h"

using namespace Cutelyst;

API::API(QObject *parent) : Controller(parent)
{
}

API::~API()
{
}

void API::root(Context *c)
{
    c->response()->body() = "Matched Controller::API in API.";
}

