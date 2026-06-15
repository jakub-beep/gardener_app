"""db dummy data

Revision ID: 494992423a89
Revises: 2487c2513b69
Create Date: 2026-06-09 11:34:51.907240

"""

import sqlalchemy as sa
from alembic import op
from sqlalchemy.orm import Session

from app.db.load_dummy_data import load_dummy_data

# revision identifiers, used by Alembic.
revision = "494992423a89"
down_revision = "2487c2513b69"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()

    session = Session(bind=bind)

    load_dummy_data(session)


def downgrade() -> None:
    pass
