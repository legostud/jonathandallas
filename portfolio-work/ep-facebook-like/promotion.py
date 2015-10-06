"""Definition of the Promotion content type
"""

from zope.interface import implements

from Products.Archetypes import atapi
from Products.ATContentTypes.content import base
from Products.ATContentTypes.content import schemata

from evp.site.content import contentMessageFactory as _
from evp.site.content.interfaces import IPromotion
from evp.site.content.config import PROJECTNAME

PromotionSchema = schemata.ATContentTypeSchema.copy() + atapi.Schema((

    atapi.TextField(
        name='promoarea1',
        required=False,
        language_independent = False,
        default_output_type = 'text/x-html-safe',
        widget=atapi.RichWidget(
            label=_(u'label_promo_area1', default=u'Promo Area Top'),
            description=_(u'help_promo_area1', default=u''),
        ),
    ),

    atapi.TextField(
        name='promoarea2',
        required=False,
        language_independent = True,
        default_output_type = 'text/x-html-safe',
        widget=atapi.RichWidget(
            label=_(u'label_promo_area2', default=u'Global Content'),
            description=_(u'help_promo_area2', default=u''),
        ),
    ),

    atapi.TextField(
        name='promoarea3',
        required=False,
        language_independent = False,
        default_output_type = 'text/x-html-safe',
        widget=atapi.RichWidget(
            label=_(u'label_promo_area3', default=u'Promo Area Bottom'),
            description=_(u'help_promo_area3', default=u''),
        ),
    ),

    atapi.StringField(
        name='remote_url',
        accessor='getRemoteUrl',
        language_independent = True,
        widget=atapi.StringWidget(
            label=_(u'label_remote_url', default=u'URL to remote site'),
            description=_(u'help_remote_url', 
                          default=u'Fill in for external promotions.'),
        ),
    ),
    atapi.StringField(
        name='facebook_like_id',
        required=False,
        widget=atapi.StringWidget(
            label=_(u"Facebook Like Partner ID"),
            description=_(u"Adds a specific Partner ID to the like button"),
        ),
    )

))

# Set storage on fields copied from ATContentTypeSchema, making sure they work
# well with the python bridge properties. (I have no idea what this means, and
# why annotation storage is used, but it got copied over from the old site by
# mistake, and I think it's too late to change now, as content already exists
# that use annotation storage. Sorry. //regebro)

PromotionSchema['title'].storage = atapi.AnnotationStorage()
PromotionSchema['description'].storage = atapi.AnnotationStorage()
PromotionSchema['description'].required = True
PromotionSchema['effectiveDate'].language_independent = True
PromotionSchema['expirationDate'].language_independent = True

schemata.finalizeATCTSchema(PromotionSchema, moveDiscussion=False)

class Promotion(base.ATCTContent):
    """Promotion"""
    implements(IPromotion)

    portal_type = archetype_name = "Promotion"
    schema = PromotionSchema

    title = atapi.ATFieldProperty('title')
    description = atapi.ATFieldProperty('description')

base.registerType(Promotion, PROJECTNAME)
